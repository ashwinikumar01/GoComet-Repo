import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
export class CartComponent implements OnInit {
  cartItemsDetailed: CartItemDetailed[] = [];
  cartCount = 0;
  inputAmount: number = 1;
  endSubs$: Subject<any> = new Subject();
  totalAmount = 0;

  constructor(
    private cartService: CartService,
    private productService: ProductsService,
    private toasterService: ToasterService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this._getCartDetails();
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
              this.inputAmount = cartItem.quantity;
              this.totalAmount += cartItem.quantity * responseProduct.price;
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

  updateCartItemQuantity(
    event: any,
    cartItem: CartItemDetailed,
    shirtSizeId: number
  ) {
    const cartObject: CartItem = {
      id: cartItem.product.id,
      sizeId: shirtSizeId,
      quantity: event.target.value,
    };
    this.cartService.setCartItem(cartObject, true);
  }

  deleteCartItem(cartItem: CartItemDetailed) {
    this.totalAmount = 0;
    this.cartService.deleteCartItem(cartItem.product.id, cartItem.sizeId);
    this.toasterService.showSuccessTopRight('Cart item has been deleted');
  }

  closeModal(close) {
    this.activeModal.close(close);
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
}
