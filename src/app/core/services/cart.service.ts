import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Cart, CartItem, ProductDetails } from 'src/app/models/cart';

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

  setCartItem(cartItem: CartItem, memorySize: number): Cart {
    const cart: Cart = this.getCart();
    const cartItemExist = cart.items.find((item) => item.id === cartItem.id);

    if (cartItemExist) {
      cart.items.map((item: CartItem) => {
        const sameMemoryItemExist = item.productDetails.find(
          (i: ProductDetails) => i.size === memorySize
        );

        if (item.id === cartItem.id) {
          if (sameMemoryItemExist) {
            item.productDetails.map((i: ProductDetails) => {
              cartItem.productDetails.forEach((val: ProductDetails) => {
                if (val.size === i.size) i.quantity = i.quantity + val.quantity;
              });
            });
          } else {
            cart.items.map((updatedCartItem: CartItem) => {
              updatedCartItem.productDetails.push({
                quantity: 1,
                size: memorySize,
              });
            });
          }
        }

        return item;
      });
    } else {
      cart.items.push(cartItem);
    }

    const cartJson = JSON.stringify(cart);
    localStorage.setItem('cart', cartJson);
    this.cart$.next(cart);
    return cart;
  }

  deleteCartItem(id: number, memorySize: number) {
    const cart = this.getCart();
    const newCart = cart.items.filter((item: CartItem) => {
      console.log(
        item.productDetails.filter(
          (prodDetails: ProductDetails) =>
            prodDetails.size !== memorySize && item.id !== id
        )
      );
      // item.productDetails.filter(
      //   (prodDetails: ProductDetails) =>
      //     prodDetails.size !== memorySize && item.id !== id
      // );
    });

    cart.items = newCart;

    const cartJsonString = JSON.stringify(cart);
    localStorage.setItem('cart', cartJsonString);

    this.cart$.next(cart);
  }
}
