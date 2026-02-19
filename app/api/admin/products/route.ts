import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyAdminToken } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

const productSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(5),
  price: z.coerce.number().positive(),
  file_url: z.string().min(2),
  preview_image_url: z.string().url(),
  difficulty_level: z.enum(['Beginner', 'Intermediate', 'Advanced'])
});

function authorize(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) throw new Error('Missing token');
  verifyAdminToken(token);
}

export async function GET(request: NextRequest) {
  try {
    authorize(request);
    const { data, error } = await supabaseAdmin.from('products').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    authorize(request);
    const payload = productSchema.parse(await request.json());
    const { data, error } = await supabaseAdmin.from('products').insert(payload).select('*').single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed' }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    authorize(request);
    const id = request.nextUrl.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const { error } = await supabaseAdmin.from('products').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
