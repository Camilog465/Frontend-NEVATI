import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { CardsComponent } from '../../components/layout/cards/cards.component';
import { RouterLink, RouterLinkActive } from '@angular/router';



@Component({
  selector: 'app-accesorios',
  standalone: true,
  imports: [CardsComponent, RouterLink, RouterLinkActive],
  templateUrl: './accesorios.component.html',
  styleUrl: './accesorios.component.css'
})
export class AccesoriosComponent {
  products: Product[] = [];
  constructor( private productService: ProductService ) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data || []; // Asigna un arreglo vacío si `data` es `undefined`
      console.log(this.products);
    });
  }
}

