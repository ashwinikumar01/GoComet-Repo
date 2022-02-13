import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(products: Product[] | any, searchText: string): any {
    if (products == null) {
      return products;
    }

    let resultantArray = [];

    for (let product of products) {
      if (
        product.brand
          .toLocaleLowerCase()
          .indexOf(searchText.toLocaleLowerCase()) !== -1
      ) {
        resultantArray.push(product);
      }
    }

    return resultantArray;
  }
}
