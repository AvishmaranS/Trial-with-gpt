import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getProductById } from '@/lib/data';
import { razorpay } from '@/lib/razorpay';

const schema = z.object({
  productId: z.string().uuid(),
  email: z.string().email()
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });

  const product = await getProductById(parsed.data.productId);
  if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

  const order = await razorpay.orders.create({
    amount: Math.round(product.price * 100),
    currency: 'INR',
    notes: { productId: product.id, email: parsed.data.email }
  });

  return NextResponse.json({ orderId: order.id, key: process.env.RAZORPAY_KEY_ID });
}
