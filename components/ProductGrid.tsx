import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Link key={product.id} href={`/shop/${product.id}`} className="surface group overflow-hidden p-4 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
          <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl">
            <Image src={product.preview_image_url} alt={product.title} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" />
          </div>
          <h3 className="font-serif text-2xl">{product.title}</h3>
          <p className="mt-2 text-sm text-textSecondary">{product.description}</p>
          <div className="mt-4 flex items-center justify-between text-sm text-textSecondary">
            <span>{product.difficulty_level}</span>
            <span>₹{product.price}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
