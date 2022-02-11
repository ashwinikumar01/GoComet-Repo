import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartService, ProductsService } from '../core';
import { CartItemDetailed } from '../models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItemsDetailed: CartItemDetailed[] = [];
  cartCount = 0;
  endSubs$: Subject<any> = new Subject();

  constructor(private cartService: CartService,private productService:ProductsService) { }

  ngOnInit(): void {
    this._getCartDetails()
  }

  private _getCartDetails() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((respCart) => {
        this.cartItemsDetailed = [];
        this.cartCount = respCart?.items?.length ?? 0;
        respCart.items.forEach((cartItem) => {
            this.productService.getProduct(cartItem.id).subscribe((responseProduct) => {
              cartItem.productDetails.map((item:any) => {
                this.cartItemsDetailed.push({
                  product: responseProduct,
                  productDetails: {
                    quantity: item.quantity,
                    size: item.size,
                  }
              });
              })
            });
        });
        console.log(this.cartItemsDetailed);
    });
}

deleteCartItem(cartItem: CartItemDetailed, memorySize: number) {
  this.cartService.deleteCartItem(cartItem.product.id, memorySize);
}

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
}
