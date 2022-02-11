export class Cart {
  items?: CartItem[];
}

export class CartItem {
  id?: number;
  productDetails: ProductDetails[];
}

export class ProductDetails {
  quantity?: number;
  size?: number;
}
