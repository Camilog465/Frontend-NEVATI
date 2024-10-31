// import { Component } from '@angular/core';
// import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { ProductService } from '../../../services/product.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-product-form-edit',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './product-form-edit.component.html',
//   styleUrl: './product-form-edit.component.css'
// })
// export class ProductFormEditComponent {

//   productForm!: FormGroup;
//   showModal: boolean = false;
  
//   constructor(
//     private productService: ProductService, 
//     private router: Router,
//     private activatedRouter: ActivatedRoute
//   ) 
//     { // Inyección correcta del Router
//     this.productForm = new FormGroup({
//       name: new FormControl('', [ Validators.required ]),
//       description: new FormControl(''),
//       price: new FormControl(0, [ Validators.required, Validators.min(0) ]),
//       quantity: new FormControl(1, [ Validators.required, Validators.min(1) ]),
//       category: new FormControl('non-category', [ Validators.required ]),
//       urlImage: new FormControl('')
//     });
//   }

//   onSubmit() {
//     if (this.productForm.valid) {

//     }

       
//     this.productForm.reset(); //Limpia los campos del formulario
//   }
//   //Ciclo de vida qeu informa de la inicializacion del componente
//   ngOnInit(){
//     //obtenemos los datos de las categorias para desplegarlas en el formulario a traves del elemento select como un option
//   this.activatedRouter.params.subscribe((data: any) => {
//     console.log( data.id )

//   })
//   }
// }



