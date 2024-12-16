import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { CardsComponent } from '../../components/layout/cards/cards.component';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ResponsePro } from '../../interfaces/response';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, CardsComponent, FormsModule, CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  mainImage: string = '/assets/images/portatil-a.png'; 
  quantity: number = 1;  
  product!: Product;
  products: Product[] = [];

  mostrarValidacion: boolean = false;
  mostrarDescription: boolean = false;
  mostrarEspecificaciones: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService, 
    private cartService: CartService, 
    private router: Router
  ) {
    console.log( this.mostrarValidacion );
  }

  changeImage(event: Event) {
    const target = event.target as HTMLImageElement;
    this.mainImage = target.src; 
  }

  
  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  setActiveTab(tab: string) {
    this.mostrarDescription = false;
    this.mostrarValidacion = false;
    this.mostrarEspecificaciones = false;

    switch (tab) {
      case 'description':
        this.mostrarDescription = true;
        break;
      case 'validation':
        this.mostrarValidacion = true;
        break;
      case 'specifications':
        this.mostrarEspecificaciones = true;
        break;
    }
  }



  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product); 
    }
  }

  buyNow() {
    if (this.product) {
      const productsToCheckout = [{
        info: this.product,  
        order: this.quantity, 
        total: this.quantity * this.product.price 
      }];
  
      this.cartService.setCheckoutProducts(productsToCheckout);
      this.router.navigate(['/checkout']);
    } else {
      console.warn('No hay producto para comprar.');
    }
  }
  
  
  
  ngOnInit() {
  const productId = this.route.snapshot.paramMap.get('id'); 
  if (productId) {
    this.productService.getProduct(productId).subscribe((response: ResponsePro ) => {
      if (response.ok && response.data) { 
        this.product = response.data; 
      } else {
        console.error('Error fetching product:', response.msg);
      }
    }, error => {
      console.error('Error fetching product:', error);
    });
  }
  this.productService.getAllProducts().subscribe( data => {
    this.products = data || []; 
    console.log( this.products );
  });
}
  
}
