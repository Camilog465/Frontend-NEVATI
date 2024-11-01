import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css'
  })
  export class ProductListComponent {
  
    products: any = [];
  
    constructor(private productService: ProductService, private router: Router){}
  
    ngOnInit(){
      this.loadData();
  
    }
    loadData (){
      this.productService.getAllProducts ().
      subscribe ((data) =>{
        console.log(data);
        this.products = data
      })
    }
    editar (id:any) {
      console.log(`Edita producto ${id}`);
      this.router.navigateByUrl (`product/edit/${id}`)
  
    }
    eliminar (id: any){
      console.log('Elimina producto'+ id);
      this.productService.deleteProduct (id). subscribe ((data)=>{
        console.log(data);
        this.loadData ();
      })
  
    }
  
  }
  
  