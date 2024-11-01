import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; // Asegúrate de tener esto importado
import { Subscription } from 'rxjs';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-form-product-edit',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule, RouterLink],
  templateUrl: './product-form-edit.component.html',
  styleUrl: './product-form-edit.component.css'
})
export class ProductEditComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  productEditForm!: FormGroup;
  showModal: boolean = false;
  productId!: string; 

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute 
  ) {
    this.productEditForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
      category: new FormControl('non-category', [Validators.required]),
      urlImage: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.productId = params['id'];
        this.loadProduct(this.productId); 
    });
}

loadProduct(productId: string): void {
  console.log(productId)
  this.subscription = this.productService
    .getProductById(productId)
    .subscribe( ({ name, description, price, quantity, category, urlImage }) => {
   

      this.productEditForm.setValue({
        name,
        description ,
        price,
        quantity,
        category,
        urlImage
      });
  });
}

  onSubmit() {
    if (this.productEditForm.valid) {
      const formData = this.productEditForm.value;
      this.subscription = this.productService.editProduct(this.productId, formData).subscribe(
        response => {
          console.log('Producto editado exitosamente');
          this.showModal = true;
          this.router.navigateByUrl('product/list')
        },
        error => {
          console.error('Error al editar el producto:', error);
        }
      );
    } else {
      console.log('El formulario no es válido');
    }
  }

  closeModal() {
    this.showModal = false;
  }

  handleAccept() {
    this.closeModal();
    this.productEditForm.reset();
    this.router.navigate(['/dashboard']); 
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}