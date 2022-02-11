import { Component } from '@angular/core';
import { CartService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private cartService: CartService) {
    this.cartService.initCartLocalStorage();
  }
}
