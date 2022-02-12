import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core';

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
      this.cartCount = cart?.items?.length ?? 0;
      // cart?.items?.forEach((cartItem: CartItem) => {
      //   const cartCount = cartItem.productDetails.reduce((acc, item: any) => {
      //     return acc + item.quantity;
      //   }, 0);

      //   console.log(cartCount);
      // });
    });
  }
}
