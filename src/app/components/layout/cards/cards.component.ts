import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../../interfaces/product';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  product!: Product;
  quantity: number = 1; 
  @Input() productValue!: Product;

  constructor(private productService: ProductService,
    private cartService: CartService,  
    private router: Router){
    
  }
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  buyNow() {
    if (this.productValue) {
      const productsToCheckout = [{
        info: this.productValue,
        order: 1, // Puedes cambiar esto si tienes un orden específico
        total: this.productValue.price
      }];
  
      this.cartService.setCheckoutProducts(productsToCheckout);
      this.router.navigate(['/checkout']);
    } else {
      console.warn('No hay producto para comprar.');
    }
  }
  

}
