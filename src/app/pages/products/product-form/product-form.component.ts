import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router'; // Asegúrate de tener esto importado

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'] 
})
export class ProductFormComponent {
  productForm!: FormGroup;
  showModal: boolean = false;
  
  constructor(private productService: ProductService, private router: Router) { // Inyección correcta del Router
    this.productForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(0),
      size: new FormControl(''),
      quality: new FormControl(''),
      quantity: new FormControl(1),
      category: new FormControl('')
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      console.log( formData );
      this.productService.registerProduct(formData).subscribe( data => {
        console.log( data );
      });
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