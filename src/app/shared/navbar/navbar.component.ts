import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core';
import { CartItem, ProductDetails } from 'src/app/models/cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  cartCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      cart?.items?.forEach((cartItem: CartItem) => {
        cartItem?.productDetails?.forEach((item: ProductDetails) => {
          if (item?.size) {
            this.cartCount = item?.quantity;
          } else {
            this.cartCount = this.cartCount + item?.quantity;
          }
        });
      });
    });
  }
}
