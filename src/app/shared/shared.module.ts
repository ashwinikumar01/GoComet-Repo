import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [NavbarComponent, LoaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent, LoaderComponent],
})
export class SharedModule {}
