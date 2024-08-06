export interface CartItemProps {
  id: number;
  name: string;
  price: number;
  details: string;
  quantity: number;
  imageUrl: string;
  disabled?: boolean;
  className?: string;
}
