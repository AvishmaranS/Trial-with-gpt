import { supabaseAdmin } from '@/lib/supabase';
import { Product } from '@/types';

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Product[];
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabaseAdmin.from('products').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data as Product | null;
}
