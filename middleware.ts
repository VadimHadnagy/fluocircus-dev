import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose'
import jwt from 'jsonwebtoken';
import { jwtSecret } from './config/config';
//import { getGlobalToken } from './pages/api/hasToken';

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET),
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect("/auth/login");
  }
  const decoded = await jose.jwtVerify(token, jwtConfig.secret);
  
};

export const config = {
  matcher: "/panel/dashboard"
}
