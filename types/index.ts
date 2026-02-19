export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  file_url: string;
  preview_image_url: string;
  difficulty_level: 'Beginner' | 'Intermediate' | 'Advanced';
  created_at: string;
};

export type Purchase = {
  id: string;
  product_id: string;
  payment_id: string;
  email: string;
  created_at: string;
};
