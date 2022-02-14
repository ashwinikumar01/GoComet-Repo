import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  CartService,
  ProductsService,
  ToasterService,
  WishlistService,
} from '../core';
import { CartItem } from '../models/cart';
import { Product } from '../models/product';
import { WishlistItem } from '../models/wishlist';
import { WishlistItemDetailed } from '../models/wishlist-item-detailed';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit, OnDestroy {
  wishlistItemsDetailed: WishlistItemDetailed[] = [];
  endSubs$: Subject<any> = new Subject();
  selectedShirtSizeId: any;
  selectedShirtSize: any;
  closeModal: string;

  constructor(
    private wishlistService: WishlistService,
    private productService: ProductsService,
    private toasterService: ToasterService,
    private cartService: CartService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this._getWishlistDetails();
  }

  private _getWishlistDetails() {
    this.wishlistService.wishlist$
      .pipe(takeUntil(this.endSubs$))
      .subscribe((respWishlist) => {
        this.wishlistItemsDetailed = [];
        respWishlist?.wishlist.forEach((wishlistItem: WishlistItem) => {
          this.productService
            .getProduct(wishlistItem.id)
            .subscribe((responseProduct: Product) => {
              this.selectedShirtSize = responseProduct.shirtSize[0].size;
              this.selectedShirtSizeId = responseProduct.shirtSize[0].sizeId;
              this.wishlistItemsDetailed.push({
                product: responseProduct,
                isLiked: wishlistItem.isLiked,
              });
            });
        });
      });
  }

  getSelectedShirtSize(product: Product, index: number) {
    this.selectedShirtSizeId = product.shirtSize[index].sizeId;
    this.selectedShirtSize = product.shirtSize[index].size;
  }

  addToCart(wishlistItem: WishlistItemDetailed): void {
    const cartItem: CartItem = {
      id: wishlistItem.product.id,
      quantity: 1,
      sizeId: this.selectedShirtSizeId,
    };

    this.cartService.setCartItem(cartItem);
    this.toasterService.showSuccessTopRight('Item Added to Cart');
  }

  deleteWishlistItem(wishlistItem: WishlistItemDetailed) {
    this.wishlistService.removeWishlistItem(wishlistItem.product.id);
  }

  triggerModal(content) {
    this.modalService.open(content, { centered: true }).result.then(
      (res) => {
        this.closeModal = `Closed with: ${res}`;
      },
      (res) => {
        this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
}
