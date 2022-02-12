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
  selectedMemoryId: number;
  image: string;
  imagesList = [];

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
      .subscribe((resProduct: Product) => {
        this.isLoading = false;
        this.product = resProduct;
        this.selectedMemory = resProduct.memory[0].size;
        this.selectedMemoryId = resProduct.memory[0].sizeId;
        this.image = resProduct.images[0];
        this.imagesList = resProduct.images;
      });
  }

  getSelectedMemorySize(index: number) {
    this.selectedMemoryId = this.product.memory[index].sizeId;
    this.selectedMemory = this.product.memory[index].size;
  }

  addToCart() {
    const cartItem: CartItem = {
      id: this.product.id,
      quantity: 1,
      sizeId: this.selectedMemoryId,
    };

    this.cartService.setCartItem(cartItem);
  }

  onHoverImage(index: number) {
    this.image = this.imagesList[index];
  }

  ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }
}
