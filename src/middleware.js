
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function protectRoute(req = NextRequest) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    if (req.nextUrl.pathname.startsWith("/admin") && token?.roleid !== 1) {
        return NextResponse.rewrite(
            new URL("/login", req.url)
        );
    }

    if (req.nextUrl.pathname.startsWith("/seller") && token?.roleid !== 2) {
        return NextResponse.rewrite(
            new URL("/login", req.url)
        );
    }
    if (req.nextUrl.pathname.startsWith("/user") && token?.roleid !== 3) {
        return NextResponse.rewrite(
            new URL("/login", req.url)
        );
    }
}
export const config = { matcher: ["/user/:path*", "/admin/:path*", "/seller/:path*"] }
