import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductsService, ToasterService, WishlistService } from '../core';
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

  constructor(
    private wishlistService: WishlistService,
    private productService: ProductsService,
    private toasterService: ToasterService
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
              this.wishlistItemsDetailed.push({
                product: responseProduct,
                isLiked: wishlistItem.isLiked,
              });
            });
        });
      });
  }

  deleteWishlistItem(wishlistItem: WishlistItemDetailed) {
    this.wishlistService.removeWishlistItem(wishlistItem.product.id);
    this.toasterService.showSuccessTopRight(
      'Item has been removed from wishlist'
    );
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
}
