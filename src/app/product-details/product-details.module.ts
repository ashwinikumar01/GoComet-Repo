import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details.component';
import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [CommonModule, ProductDetailsRoutingModule, SharedModule],
})
export class ProductDetailsModule {}
