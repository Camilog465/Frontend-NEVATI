import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CardsComponent } from '../../components/layout/cards/cards.component';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,RouterLinkActive, CardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products: Product[] = [];
  constructor( private productService: ProductService ) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data || []; // Asigna un arreglo vacío si `data` es `undefined`
      console.log(this.products);
    });
  }

}
