import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductsService } from './services/products.service';

@NgModule({
  imports: [CommonModule],
  providers: [ProductsService],
})
export class CoreModule {}
