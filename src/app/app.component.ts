import { Component } from '@angular/core';
import { CartService } from './core';
import { WishlistService } from './core/services/wishlist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {
    this.cartService.initCartLocalStorage();
    this.wishlistService.initWishlistLocalStorage();
  }
}
