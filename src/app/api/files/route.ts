import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

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

  const page = pageParam ? parseInt(pageParam) : 1;
  const limit = limitParam ? parseInt(limitParam) : 10;
  const skip = (page - 1) * limit;

  const [files, totalCount] = await Promise.all([
    prisma.file.findMany({
      where: { userId },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
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
  const REVALIDATION_PATH = "/dashboard";
  const token = await getToken({ req: request, secret });

  if (!token?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = token.sub;

  try {
    try {
      await fs.access(UPLOAD_DIR);
    } catch {
      await fs.mkdir(UPLOAD_DIR, { recursive: true });
    }
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({
        error: "No file provided",
        status: 400,
      });
    }

    const fileExtension = path.extname(file.name);
    const fileName = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    fs.writeFile(filePath, fileBuffer);

    const relativePath = `/uploads/${fileName}`;

    await prisma.file.create({
      data: {
        name: file.name,
        mimetype: file.type,
        path: relativePath,
        userId,
        size: file.size,
      },
    });

    revalidatePath(REVALIDATION_PATH);
    return NextResponse.json(
      {
        message: "File has been successfully processed.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
