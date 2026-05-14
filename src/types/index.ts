export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  material: string;
  specs: string;
  image?: string;
  images?: string[]; // Multiple images for slider
}

export interface CartItem extends Product {
  quantity: number;
}
