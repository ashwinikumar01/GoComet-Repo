import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products-list',
    pathMatch: 'full',
  },
  {
    path: 'products-list',
    component: HomeComponent,
  },
  {
    path: 'products-list/:id',
    loadChildren: () =>
      import('./product-details/product-details.module').then(
        (m) => m.ProductDetailsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
