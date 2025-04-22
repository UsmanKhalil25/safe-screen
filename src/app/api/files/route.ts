import { v4 as uuidv4 } from "uuid";
import path from "path";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const secret = process.env.NEXTAUTH_SECRET;
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request, secret });

  if (!token?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = token.sub;

  const { searchParams } = request.nextUrl;
  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");
  const sortParam = searchParams.get("sort");
  const queryParam = searchParams.get("query");

  const page = pageParam ? parseInt(pageParam) : 1;
  const limit = limitParam ? parseInt(limitParam) : 10;
  const skip = (page - 1) * limit;
  const sort = sortParam === "asc" ? "asc" : "desc";
  const query = queryParam ?? "";

  const where: Prisma.FileWhereInput = {
    userId,
    ...(query && {
      OR: [{ name: { contains: query, mode: "insensitive" } }],
    }),
  };

  const [files, totalCount] = await Promise.all([
    prisma.file.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: sort },
    }),
    prisma.file.count({
      where: { userId },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return NextResponse.json(
    {
      message: "Files fetched successfully",
      data: files,
      pagination: {
        totalItems: totalCount,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request, secret });

  if (!token?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = token.sub;

  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const originalName = file.name;
    const ext = path.extname(originalName);
    const base = originalName.slice(0, -ext.length);

    const existingFiles = await prisma.file.findMany({
      where: {
        userId,
        name: { startsWith: base, endsWith: ext },
      },
      select: { name: true },
    });

    const numbers: number[] = [];
    for (const { name } of existingFiles) {
      if (name === `${base}${ext}`) {
        numbers.push(0);
        continue;
      }

      const suffix = name.slice(base.length, -ext.length);
      const suffixMatch = suffix.match(/^ \((\d+)\)$/);
      if (suffixMatch) numbers.push(parseInt(suffixMatch[1], 10));
    }

    const newNumber = numbers.length > 0 ? Math.max(...numbers) + 1 : 0;
    const newName =
      newNumber === 0 ? `${base}${ext}` : `${base} (${newNumber})${ext}`;

    const fileName = `${uuidv4()}${path.extname(file.name)}`;
    const filePath = path.join(UPLOAD_DIR, fileName);
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, fileBuffer);

    await prisma.file.create({
      data: {
        name: newName,
        mimetype: file.type,
        path: `/uploads/${fileName}`,
        userId,
        size: file.size,
      },
    });

    return NextResponse.json(
      { message: "File processed successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process file" },
      { status: 500 }
    );
  }
}
