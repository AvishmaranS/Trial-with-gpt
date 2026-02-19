import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase';

const verifySchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
  productId: z.string().uuid(),
  email: z.string().email()
});

export async function POST(request: Request) {
  const parsed = verifySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ success: false }, { status: 400 });

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productId, email } = parsed.data;

  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generatedSignature !== razorpay_signature) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from('purchases')
    .insert({ product_id: productId, payment_id: razorpay_payment_id, email });

  if (error) return NextResponse.json({ success: false }, { status: 500 });

  return NextResponse.json({ success: true, downloadUrl: `/api/download/${productId}?email=${encodeURIComponent(email)}` });
}
