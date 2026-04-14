export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  stock: number;
};

export type Order = {
  id: string;
  customer_name: string;
  email: string;
  whatsapp: string;
  total_price: number;
  status: string;
  proof_url?: string;
};
