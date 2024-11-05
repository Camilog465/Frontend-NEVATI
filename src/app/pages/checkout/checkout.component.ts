import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product';
import { Item } from '../../interfaces/cart';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  items: Item[] = []; 
  total: number = 0; 
  shippingForm: FormGroup;

  constructor(private fb: FormBuilder, private cartService: CartService) {
    this.shippingForm = this.fb.group({
      name: [''],
      address: [''],
      city: [''],
      phone: [''],
      paymentMethod: ['credit']
    });
  }

  ngOnInit(): void {
    this.items = this.cartService.getCheckoutProducts() || []; 
    this.updateTotal();
  }

  increaseQuantity(item: Item): void {
    item.order++;
    this.updateLocalStorage();
    this.updateTotal();
  }
  
  decreaseQuantity(item: Item): void {
    if (item.order > 1) {
      item.order--;
      this.updateLocalStorage(); 
      this.updateTotal();
    }
  }
  groupItems(): Item[] {
    const grouped: Item[] = [];

    for (const item of this.items) {
        if (!item.info) continue; 

        const existingItem = grouped.find(i => i.info?._id === item.info?._id);
        if (existingItem) {
            existingItem.order += item.order; 
        } else {  
            grouped.push({ ...item }); 
        }
    }

    return grouped;
  }

  loadCheckoutProducts(): void {
    this.items = this.cartService.getCartProducts(); 
    const uniqueIds = Array.from(new Set(this.items.map(item => item.info?._id)));
    
    // Filtramos para asegurarnos de que solo tenemos Items válidos
    this.items = uniqueIds
        .map(id => this.items.find(item => item.info?._id === id))
        .filter((item): item is Item => item !== undefined); // Filtro de tipo para excluir undefined
}

  updateTotal(): void {
    this.total = this.items.reduce((acc, item) => acc + (item.info?.price || 0) * item.order, 0); 
  }
  
  updateLocalStorage(): void {
    const updatedItems = this.items.map(item => ({
        info: item.info,
        order: item.order
    }));
    localStorage.setItem('cart', JSON.stringify(updatedItems));
}


  removeProduct(item: Item): void {
    if (item.info) {
      this.cartService.removeFromCart(item.info);
      this.items = this.items.filter(i => i.info?._id !== item.info?._id);
      this.updateTotal();
    }
  }


  completePurchase(): void {
    // Lógica para completar la compra
  }

}
