import { NextRequest, NextResponse } from 'next/server';

const redirectMap: Record<string, string> = {
  mac: process.env.REDIRECT_MAC || '',
  win: process.env.REDIRECT_WIN || '',
  linux: process.env.REDIRECT_LINUX || '',
  linuxdev: process.env.REDIRECT_LINUX_DEV || '',
  debian: process.env.REDIRECT_DEBIAN || '',
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const to = searchParams.get('to');

  if (!to || !redirectMap[to]) {
    return new NextResponse('Invalid redirect', { status: 400 });
  }

  return NextResponse.redirect(redirectMap[to], {
    status: 307, // Use 307 Temporary Redirect
  });
} 