import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router'; // Asegúrate de tener esto importado

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'] 
})
export class ProductFormComponent {
  productForm!: FormGroup;
  showModal: boolean = false;
  
  constructor(private productService: ProductService, private router: Router) { // Inyección correcta del Router
    this.productForm = new FormGroup({
      name: new FormControl('', [ Validators.required ]),
      description: new FormControl(''),
      price: new FormControl(0, [ Validators.required, Validators.min(0) ]),
      quantity: new FormControl(1, [ Validators.required, Validators.min(1) ]),
      category: new FormControl('non-category', [ Validators.required ]),
      urlImage: new FormControl('')
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      this.productService.registerProduct(formData).subscribe(
        response => {
          console.log('Producto registrado exitosamente'); 
          this.showModal = true; 
        },
        error => {
          console.error('Error al registrar el producto:', error); 
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
    this.productForm.reset();
  }
}