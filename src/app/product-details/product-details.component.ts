import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CartService, ProductsService } from '../core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Product } from '../models/product';
import { CartItem } from '../models/cart';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: Product;
  productId: number;
  endsubs$: Subject<any> = new Subject();
  isLoading = false;
  selectedMemory: number;

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.productId = params.id;
        this._getProduct(this.productId);
      }
    });
  }

  private _getProduct(id: number) {
    this.isLoading = true;
    this.productService
      .getProduct(id)
      .pipe(takeUntil(this.endsubs$))
      .subscribe((resProduct: any) => {
        this.isLoading = false;
        this.product = resProduct;
        this.selectedMemory = resProduct.memory[0].size;
      });
  }

  getSelectedMemorySize(memorySize: number): number {
    this.selectedMemory = memorySize;
    return this.selectedMemory;
  }

  addToCart() {
    const cartItem: CartItem = {
      id: this.product.id,
      productDetails: [
        {
          quantity: 1,
          size: this.selectedMemory,
        },
      ],
    };

    this.cartService.setCartItem(cartItem, this.selectedMemory);
  }

  ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }
}
