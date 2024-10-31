import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.css'
})
export class ShoppingComponent {
  compras = [
    { nombreProducto: 'Producto 1', precio: 50000, fechaCompra: new Date('2024-10-10') },
    { nombreProducto: 'Producto 2', precio: 75000, fechaCompra: new Date('2024-09-25') },
    { nombreProducto: 'Producto 3', precio: 30000, fechaCompra: new Date('2024-08-15') }
  ];
}
