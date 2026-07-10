import { NextResponse } from 'next/server';

const RESUME_FILE_PATH = '/cv-daffa-azhar-putra-utama.pdf';

export function GET(request: Request) {
  return NextResponse.redirect(new URL(RESUME_FILE_PATH, request.url));
}
