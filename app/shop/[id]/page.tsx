import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PurchaseButton } from '@/components/PurchaseButton';
import { getProductById } from '@/lib/data';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  if (!product) return { title: 'Product Not Found' };

  return {
    title: product.title,
    description: product.description,
    openGraph: { images: [product.preview_image_url] }
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  if (!product) notFound();

  return (
    <article className="grid gap-10 md:grid-cols-2">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
        <Image src={product.preview_image_url} alt={product.title} fill className="object-cover" />
      </div>
      <div>
        <h1 className="font-serif text-5xl">{product.title}</h1>
        <p className="mt-4 text-textSecondary">{product.description}</p>
        <p className="mt-4 text-sm text-textSecondary">Difficulty: {product.difficulty_level}</p>
        <p className="mt-2 text-2xl">₹{product.price}</p>
        <div className="mt-8">
          <PurchaseButton productId={product.id} amount={product.price} />
        </div>
      </div>
    </article>
  );
}
