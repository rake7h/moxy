import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('request.nextUrl.pathname', request.nextUrl.pathname);

  const response = NextResponse.next();

  // set moxy identifier
  response.headers.set('x-moxy', 'yes');

  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS',
  );
  response.headers.set('Access-Control-Allow-Headers', '*');
  return response;
}
