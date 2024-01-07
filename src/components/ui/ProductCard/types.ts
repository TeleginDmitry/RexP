export interface ProductCardProps {
  className?: string;
  outOfStock?: boolean;
  liked?: boolean;
  price: number | string;
  name: string;
  imgUrl: string;
  id: number | string;
	imagePriority?: boolean;
}
