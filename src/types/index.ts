export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  material: string;
  specs: string;
}

export interface CartItem extends Product {
  quantity: number;
}
