import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartService, ProductsService, ToasterService } from '../core';
import { CartItem } from '../models/cart';
import { CartItemDetailed } from '../models/cart-item-detailed';
import { Product } from '../models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, AfterContentInit {
  cartItemsDetailed: CartItemDetailed[] = [];
  cartCount = 0;
  endSubs$: Subject<any> = new Subject();
  element: HTMLElement;

  constructor(
    private cartService: CartService,
    private productService: ProductsService,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this._getCartDetails();
  }

  ngAfterContentInit() {
    this.element = document.getElementById('hiddenBtn') as HTMLElement;
    this.element.click();
  }

  private _getCartDetails() {
    this.cartService.cart$
      .pipe(takeUntil(this.endSubs$))
      .subscribe((respCart) => {
        this.cartItemsDetailed = [];
        this.cartCount =
          respCart?.items?.reduce(
            (totalCartCount: any, currentValue: CartItem) =>
              totalCartCount + currentValue.quantity,
            0
          ) ?? 0;
        respCart?.items?.forEach((cartItem: CartItem) => {
          this.productService
            .getProduct(cartItem.id)
            .subscribe((responseProduct: Product) => {
              this.cartItemsDetailed.push({
                product: responseProduct,
                sizeId: cartItem.sizeId,
                quantity: cartItem.quantity,
              });
            });
        });
      });
  }

  getShirtSize(index, sizeIndex) {
    return this.cartItemsDetailed[index].product.shirtSize[sizeIndex - 1].size;
  }

  deleteCartItem(cartItem: CartItemDetailed) {
    this.cartService.deleteCartItem(cartItem.product.id, cartItem.sizeId);
    this.toasterService.showSuccessTopRight('Cart item has been deleted');
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
}
