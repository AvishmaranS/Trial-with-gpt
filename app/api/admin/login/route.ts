import { NextResponse } from 'next/server';
import { z } from 'zod';
import { signAdminToken } from '@/lib/auth';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
  }

  if (
    parsed.data.email !== process.env.ADMIN_EMAIL ||
    parsed.data.password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ token: signAdminToken(parsed.data.email) });
}
