import { ProductGrid } from '@/components/ProductGrid';
import { getProducts } from '@/lib/data';

export const metadata = {
  title: 'Digital Shop',
  description: 'Purchase MIDI and sheet music with secure downloads.'
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <section>
      <h1 className="mb-10 font-serif text-5xl">Digital Product Shop</h1>
      <ProductGrid products={products} />
    </section>
  );
}
