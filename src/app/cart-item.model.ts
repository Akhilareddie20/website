export interface CartItem {
  id: number;          // ✅ Ensure this field is defined
  email: string;
  image: string;
  title: string;
  subtitle: string;
  material: string;
  rating: number;
  quantity: number;
  price: number;
}
