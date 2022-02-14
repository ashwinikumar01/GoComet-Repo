import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CartService, ProductsService, ToasterService } from '../core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Product } from '../models/product';
import { CartItem } from '../models/cart';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: Product;
  productId: number;
  endsubs$: Subject<any> = new Subject();
  isLoading = false;
  selectedShirtSize: number;
  selectedShirtSizeId: number;
  image: string;
  imagesList = [];
  closeModal: string;

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.productId = params.id;
        this._getProduct(this.productId);
      }
    });
  }

  private _getProduct(id: number) {
    this.isLoading = true;
    this.productService
      .getProduct(id)
      .pipe(takeUntil(this.endsubs$))
      .subscribe((resProduct: Product) => {
        this.isLoading = false;
        this.product = resProduct;
        this.selectedShirtSize = resProduct.shirtSize[0].size;
        this.selectedShirtSizeId = resProduct.shirtSize[0].sizeId;
        this.image = resProduct.images[0];
        this.imagesList = resProduct.images;
      });
  }

  getSelectedShirtSize(index: number) {
    this.selectedShirtSizeId = this.product.shirtSize[index].sizeId;
    this.selectedShirtSize = this.product.shirtSize[index].size;
  }

  addToCart() {
    const cartItem: CartItem = {
      id: this.product.id,
      quantity: 1,
      sizeId: this.selectedShirtSizeId,
    };

    this.cartService.setCartItem(cartItem);
    this.toasterService.showSuccessTopRight('Item Added to Cart');
  }

  onHoverImage(index: number) {
    this.image = this.imagesList[index];
  }

  triggerModal() {
    this.modalService
      .open(CartComponent, { scrollable: true, centered: true, size: 'xl' })
      .result.then(
        (res) => {
          this.closeModal = `Closed with: ${res}`;
        },
        (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }
}
