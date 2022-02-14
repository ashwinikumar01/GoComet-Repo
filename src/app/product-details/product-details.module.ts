import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details.component';
import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CartComponent } from '../cart/cart.component';

@NgModule({
  declarations: [ProductDetailsComponent, CartComponent],
  imports: [CommonModule, ProductDetailsRoutingModule, SharedModule],
})
export class ProductDetailsModule {}
