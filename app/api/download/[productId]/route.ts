import { NextRequest, NextResponse } from 'next/server';
import { getProductById } from '@/lib/data';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest, { params }: { params: { productId: string } }) {
  const email = request.nextUrl.searchParams.get('email');
  if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

  const product = await getProductById(params.productId);
  if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

  const { data: purchase } = await supabaseAdmin
    .from('purchases')
    .select('id')
    .eq('product_id', params.productId)
    .eq('email', email)
    .maybeSingle();

  if (!purchase) return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 });

  const { data, error } = await supabaseAdmin.storage.from('products').createSignedUrl(product.file_url, 60 * 5);

  if (error || !data) {
    return NextResponse.json({ error: 'Failed to generate signed URL' }, { status: 500 });
  }

  return NextResponse.redirect(data.signedUrl);
}
