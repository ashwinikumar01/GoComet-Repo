import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Cart, CartItem } from 'src/app/models/cart';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  constructor() {}

  initCartLocalStorage() {
    const cart: Cart = this.getCart();
    if (!cart) {
      const initialCart = {
        items: [],
      };
      const initialCartJSON = JSON.stringify(initialCart);
      localStorage.setItem(CART_KEY, initialCartJSON);
    }
  }

  getCart() {
    const cartJsonString: string = localStorage.getItem(CART_KEY);
    const cart: Cart = JSON.parse(cartJsonString);
    return cart;
  }

  setCartItem(cartItem: CartItem): Cart {
    const cart: Cart = this.getCart();
    const cartItemIndex = cart.items.findIndex(
      (item) => item.id === cartItem.id && item.sizeId === cartItem.sizeId
    );

    if (cartItemIndex !== -1) {
      cart.items[cartItemIndex].quantity += cartItem.quantity;
    } else {
      cart.items.push(cartItem);
    }

    const cartJson = JSON.stringify(cart);
    localStorage.setItem('cart', cartJson);
    this.cart$.next(cart);
    return cart;
  }

  deleteCartItem(id: number, shirtSizeId: number) {
    const cart = this.getCart();
    const cartItemIndex = cart.items.findIndex(
      (item: CartItem) => item.id === id && item.sizeId === shirtSizeId
    );

    if (cartItemIndex !== -1) cart.items.splice(cartItemIndex, 1);

    const cartJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJson);
    this.cart$.next(cart);
    return cart;
  }
}
