import { Component, OnInit } from '@angular/core';
import { ProductsService, WishlistService } from '../core';
import { Product } from '../models/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  selectedDataToDisplay: Product[] = [];
  selectedFilteredData: any[] = [];
  isLoading = false;
  searchText: string = '';
  sortBy: any = 'recommended';
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
      this.isLoading = false;
      this.selectedDataToDisplay = response;
    });
  }

  _addToWishlist(productId: number) {
    this.wishlistService.setToWishlist({
      id: productId,
      isLiked: true,
    });
  }

  onBrandChange() {}

  onColorChange() {}

  onGenderChange() {}
}
