import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit {
  products: Product[] = [];

  constructor() {}

  ngOnInit(): void {

    this.products = [
      { id: 1, name: 'Producto 1', price: 100 },
      { id: 2, name: 'Producto 2', price: 200 },
      { id: 3, name: 'Producto 3', price: 300 },
    ];
  }
}
