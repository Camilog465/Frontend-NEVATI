import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Item } from '../interfaces/cart';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartProducts: Item[] = [];
  private localStorageKey = 'cart';
  private cartSubject = new BehaviorSubject<Item[]>(this.getCartProducts());
  cartProducts$ = this.cartSubject.asObservable();

  constructor() {
    this.loadCartFromLocalStorage();
    this.cartSubject.next(this.cartProducts); // Emitir el estado inicial
  }

  addToCart(product: Product) {
    const productFound = this.cartProducts.find((item: Item) => item.info?._id === product._id);

    if (!productFound) {
      const item: Item = {
        info: product,
        order: 1,
        total: product.price
      };
      this.cartProducts.push(item);
    } else if (productFound.order < product.quantity) {
      productFound.order += 1;
      productFound.total = productFound.order * product.price;
    } else {
      console.error('Cantidad excedida');
    }

    this.saveCartToLocalStorage();
    this.cartSubject.next(this.cartProducts); // Emitir el nuevo estado
  }

  removeFromCart(product: Product): void {
    this.cartProducts = this.cartProducts.filter(item => item.info?._id !== product._id);
    this.saveCartToLocalStorage(); // Guardar el nuevo estado en localStorage
    this.cartSubject.next(this.cartProducts); // Emitir el nuevo estado
  }

  getCartProducts(): Item[] {
    return this.cartProducts; // Devolver el estado actual del carrito
  }

  private saveCartToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartProducts));
  }

  private loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem(this.localStorageKey);
    this.cartProducts = storedCart ? JSON.parse(storedCart) : [];
  }

  setCheckoutProducts(products: { info: Product; order: number; total: number; }[]): void {
    const cart = localStorage.getItem(this.localStorageKey);
    const existingCart = cart ? JSON.parse(cart) : [];
    const updatedCart = [...existingCart, ...products];
    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedCart));
  }

  getCheckoutProducts(): Item[] {
    const items: any[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]'); 
    return items.map(item => ({
      info: item.info,  
      order: item.order
    } as Item));
  }
}
