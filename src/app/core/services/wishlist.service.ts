import { Injectable } from '@angular/core';
import { Wishlist, WishlistItem } from 'src/app/models/wishlist';

export const WISHLIST_KEY = 'isLiked';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor() {}

  initWishlistLocalStorage() {
    const wishlist: Wishlist = this.getWishlist();
    if (!wishlist) {
      const initialwishlist = {
        wishlist: [],
      };
      const initialWishlistJSON = JSON.stringify(initialwishlist);
      localStorage.setItem(WISHLIST_KEY, initialWishlistJSON);
    }
  }

  getWishlist() {
    const wishlistJsonString: string = localStorage.getItem(WISHLIST_KEY);
    const wishlist: Wishlist = JSON.parse(wishlistJsonString);
    return wishlist;
  }

  setToWishlist(wishlistItem: WishlistItem) {
    const wish: Wishlist = this.getWishlist();
    const wishlistItemIndex = wish.wishlist.findIndex(
      (localStorageWishlisteItem) =>
        localStorageWishlisteItem.id === wishlistItem.id
    );

    if (wishlistItemIndex !== -1) {
      return;
    } else {
      wish.wishlist.push(wishlistItem);
    }

    const wishListJson = JSON.stringify(wish);
    localStorage.setItem(WISHLIST_KEY, wishListJson);
    return wish;
  }

  removeWishlistItem(id: number) {
    const wish: Wishlist = this.getWishlist();
    const newWishlistIndex = wish.wishlist.findIndex(
      (item: WishlistItem) => item.id === id
    );

    if (newWishlistIndex !== -1) wish.wishlist.splice(newWishlistIndex, 1);

    const wishListJson = JSON.stringify(wish);
    localStorage.setItem(WISHLIST_KEY, wishListJson);
    return wish;
  }
}
