import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { CardsComponent } from '../../components/layout/cards/cards.component';

@Component({
  selector: 'app-colcha',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,CardsComponent ],
  templateUrl: './colcha.component.html',
  styleUrl: './colcha.component.css'
})
export class ColchaComponent {
  products: Product[] = [];
  constructor( private productService: ProductService ) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data || []; // Asigna un arreglo vacío si `data` es `undefined`
      console.log(this.products);
    });
  }

}


