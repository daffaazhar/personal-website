import { NextResponse } from 'next/server';

import { getSiteUrl } from '@/lib/site-url';

const RESUME_FILE_PATH = '/cv-daffa-azhar-putra-utama.pdf';

export function GET() {
  return NextResponse.redirect(getSiteUrl(RESUME_FILE_PATH), 308);
}
