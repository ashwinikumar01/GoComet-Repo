import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    const url = this.url + '/api';
    return this.http.get<Product[]>(url);
  }

  getProduct(productId: number): Observable<Product> {
    const url = this.url + '/api/' + productId;
    return this.http.get<Product>(url);
  }
}
