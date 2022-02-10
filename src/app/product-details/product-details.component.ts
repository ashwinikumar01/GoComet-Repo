import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: Product;
  productId: number;
  endsubs$: Subject<any> = new Subject();
  isLoading: boolean;

  constructor(
    private productService: ProductsService,
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
      .subscribe((resProduct) => {
        this.isLoading = false;
        this.product = resProduct;
      });
  }

  ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }
}
