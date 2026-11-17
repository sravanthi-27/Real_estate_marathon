import { NextResponse } from 'next/server';
import { route } from '@/server/http';
import { createRegistrationReceipt } from '@/server/services/registrationReceipt';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = route(async (req, { params }) => {
  const token = new URL(req.url).searchParams.get('token');
  const pdf = await createRegistrationReceipt(params.reference, token);
  return new NextResponse(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="Marathon_Registration_${params.reference}.pdf"`,
      'Cache-Control': 'private, no-store',
    },
  });
}, { bucket: 'registration-read', limit: 30 });
