import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../core';
import { Product } from '../models/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  constructor(private apiService: ProductsService) {}

  ngOnInit(): void {
    this._getProducts();
  }

  _getProducts() {
    this.apiService.getProducts().subscribe((res: any) => {
      this.products = res;
    });
  }
}