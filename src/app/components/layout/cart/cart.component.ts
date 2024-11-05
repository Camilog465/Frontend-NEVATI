import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Item } from '../../../interfaces/cart';
import { Product } from '../../../interfaces/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: Item[] = [];
  isCartOpen: boolean = false;
  private cartSubscription!: Subscription;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.loadCartProducts();
    this.cartSubscription = this.cartService.cartProducts$.subscribe(products => {
      this.cartProducts = products;
    });
  }


  
  ngOnDestroy() {
    this.cartSubscription.unsubscribe(); // Limpia la suscripción al destruir el componente
  }

  loadCartProducts() {
    this.cartProducts = this.cartService.getCartProducts();
  }

  getTotal(): number {
    return this.cartProducts.reduce((sum, item) => sum + (item.total || 0), 0);
  }

  removeFromCart(product: Product) {
    if (product) {
      this.cartService.removeFromCart(product);
    }
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen; 
  }

  finalizePurchase() {
    const productsToCheckout = this.cartProducts
      .filter(item => item.info !== undefined)  
      .map(item => ({
        info: item.info!,  
        order: item.order,
        total: item.order * (item.info?.price || 0)
      }));
    
    if (productsToCheckout.length > 0) {
      this.cartService.setCheckoutProducts(productsToCheckout);
      this.router.navigate(['/checkout']);
    } else {
      console.warn('No hay productos en el carrito para finalizar la compra.');
    }
  }
}
