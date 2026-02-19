'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Product } from '@/types';

export function AdminPanel() {
  const [token, setToken] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const cachedToken = localStorage.getItem('admin-token');
    if (cachedToken) {
      setToken(cachedToken);
      fetchProducts(cachedToken);
    }
  }, []);

  const fetchProducts = async (authToken: string) => {
    const res = await fetch('/api/admin/products', { headers: { Authorization: `Bearer ${authToken}` } });
    if (res.ok) {
      setProducts(await res.json());
    }
  };

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.token) {
      setToken(data.token);
      localStorage.setItem('admin-token', data.token);
      fetchProducts(data.token);
    }
  };

  const createProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      event.currentTarget.reset();
      fetchProducts(token);
    }
  };

  const deleteProduct = async (id: string) => {
    const res = await fetch(`/api/admin/products?id=${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) fetchProducts(token);
  };

  if (!token) {
    return (
      <form onSubmit={login} className="surface mx-auto max-w-lg space-y-4 p-8">
        <h2 className="font-serif text-3xl">Admin Login</h2>
        <input name="email" type="email" required placeholder="Admin email" className="w-full rounded-lg border border-white/15 bg-transparent p-3" />
        <input name="password" type="password" required placeholder="Password" className="w-full rounded-lg border border-white/15 bg-transparent p-3" />
        <button className="rounded-full bg-white/10 px-6 py-2 transition hover:bg-white/20">Login</button>
      </form>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={createProduct} className="surface space-y-3 p-6">
        <h3 className="font-serif text-3xl">Create Product</h3>
        <input required name="title" placeholder="Title" className="w-full rounded-lg border border-white/15 bg-transparent p-3" />
        <textarea required name="description" placeholder="Description" className="w-full rounded-lg border border-white/15 bg-transparent p-3" />
        <input required name="price" type="number" placeholder="Price" className="w-full rounded-lg border border-white/15 bg-transparent p-3" />
        <input required name="file_url" placeholder="Storage file path" className="w-full rounded-lg border border-white/15 bg-transparent p-3" />
        <input required name="preview_image_url" placeholder="Preview image URL" className="w-full rounded-lg border border-white/15 bg-transparent p-3" />
        <select required name="difficulty_level" className="w-full rounded-lg border border-white/15 bg-bgPrimary p-3">
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <button className="rounded-full bg-white/10 px-6 py-2 transition hover:bg-white/20">Save Product</button>
      </form>

      <section className="surface p-6">
        <h3 className="mb-4 font-serif text-3xl">Products</h3>
        <div className="space-y-3">
          {products.map((product) => (
            <div key={product.id} className="rounded-xl border border-white/10 p-4">
              <div className="flex items-center justify-between">
                <p>{product.title}</p>
                <button onClick={() => deleteProduct(product.id)} className="text-sm text-red-300 transition hover:text-red-200">
                  Delete
                </button>
              </div>
              <p className="text-sm text-textSecondary">₹{product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
