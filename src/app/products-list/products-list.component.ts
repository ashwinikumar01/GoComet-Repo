import { Component, OnInit } from '@angular/core';
import { ProductsService, WishlistService } from '../core';
import { brands } from '../mock-json/brands';
import { colors } from '../mock-json/colors';
import { genders } from '../mock-json/genders';
import { Product } from '../models/product';
import { SelectedType } from '../models/selected-type';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  selectedDataToDisplay: Product[] = [];
  products: Product[] = [];
  selectedFilteredData: any[] = [];
  isLoading = false;
  searchText: string = '';
  sortBy: any = 'recommended';
  sortDirection: any = 'asc';

  brands = brands;
  genders = genders;
  colors = colors;

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
      this.products = response;
    });
  }

  _addToWishlist(productId: number) {
    this.wishlistService.setToWishlist({
      id: productId,
      isLiked: true,
    });
  }

  onItemChange(value, isChecked, type) {
    const object: SelectedType = {
      type: type,
      itemName: value,
    };

    if (type === 'brand') {
      if (isChecked) {
        this.selectedFilteredData.push(object);
      } else {
        this.selectedFilteredData = this.selectedFilteredData.filter(
          (selectedData: SelectedType) => selectedData.itemName !== value
        );
      }
    }

    if (type === 'color') {
      if (isChecked) {
        this.selectedFilteredData.push(object);
      } else {
        this.selectedFilteredData = this.selectedFilteredData.filter(
          (selectedData: SelectedType) => selectedData.itemName !== value
        );
      }
    }

    if (type === 'gender') {
      if (value === 'Men') {
        this.selectedFilteredData.push(object);
        this.selectedFilteredData = this.selectedFilteredData.filter(
          (selectedData: SelectedType) => selectedData.itemName === value
        );
      } else if (value === 'Women') {
        this.selectedFilteredData.push(object);
        this.selectedFilteredData = this.selectedFilteredData.filter(
          (selectedData: SelectedType) => selectedData.itemName === value
        );
      } else if (value === 'Boys') {
        this.selectedFilteredData.push(object);
        this.selectedFilteredData = this.selectedFilteredData.filter(
          (selectedData: SelectedType) => selectedData.itemName === value
        );
      } else if (value === 'Girls') {
        this.selectedFilteredData.push(object);
        this.selectedFilteredData = this.selectedFilteredData.filter(
          (selectedData: SelectedType) => selectedData.itemName === value
        );
      }
    }

    this.getFinalDataToDisplay(this.selectedFilteredData);
  }

  getFinalDataToDisplay(selectedFilteredData) {
    this.selectedDataToDisplay = [];
    if (this.selectedFilteredData.length === 0) {
      this.selectedDataToDisplay = this.products;
    } else {
      selectedFilteredData.forEach((data: any) => {
        switch (data.type) {
          case 'brand':
            {
              var a = this.products.filter(
                (prod: any) => prod.brand === data.itemName
              );

              this.selectedDataToDisplay = this.selectedDataToDisplay.concat(a);
            }
            break;
          case 'gender':
            {
              var b = this.products.filter(
                (prod: any) => prod.gender === data.itemName
              );

              this.selectedDataToDisplay = this.selectedDataToDisplay.concat(b);
            }
            break;
          case 'color':
            {
              var c = this.products.filter(
                (prod: any) => prod.color === data.itemName
              );

              this.selectedDataToDisplay = this.selectedDataToDisplay.concat(c);
            }
            break;

          default:
            break;
        }
      });
    }
  }
}
