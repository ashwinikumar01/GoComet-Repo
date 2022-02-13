import { Component, OnInit } from '@angular/core';
import { ProductsService, WishlistService } from '../core';
import { Product } from '../models/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  isLoading = false;

  searchText: string = '';
  sortBy: any = 'name';
  sortDirection: any = 'asc';

  constructor(
    private apiService: ProductsService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }

  _getProducts() {
    this.isLoading = true;
    this.apiService.getProducts().subscribe((response: any) => {
      console.log(response);
      this.isLoading = false;
      this.products = response;
    });
  }

  _addToWishlist(productId: number) {
    this.wishlistService.setToWishlist({
      id: productId,
      isLiked: true,
    });
  }

  _removeFromWishlist(productId: number) {
    this.wishlistService.removeWishlistItem(productId);
  }
}
