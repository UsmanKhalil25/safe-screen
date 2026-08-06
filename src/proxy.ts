import { NextRequest, NextResponse } from "next/server";

import { getAuth } from "@/lib/auth";

const authRoutes = ["/sign-in", "/sign-up"];
const protectedRoutes = ["/"];

export async function proxy(request: NextRequest) {
	const path = request.nextUrl.pathname;

	const auth = await getAuth();
	const session = await auth.api.getSession({ headers: request.headers });

	if (protectedRoutes.includes(path) && !session) {
		return NextResponse.redirect(new URL("/sign-in", request.url));
	}

	if (authRoutes.includes(path) && session) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/", "/sign-in", "/sign-up"],
};
