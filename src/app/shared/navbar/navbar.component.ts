import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core';
import { Cart, CartItem } from 'src/app/models/cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  cartCount: number;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart: Cart) => {
      this.cartCount =
        cart?.items?.reduce(
          (totalCartCount: any, currentValue: CartItem) =>
            totalCartCount + currentValue.quantity,
          0
        ) ?? 0;
    });
  }
}
