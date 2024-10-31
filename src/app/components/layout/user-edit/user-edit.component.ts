import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router'; 
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [ RouterLink, RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {
  formData!: FormGroup;
  showPassword: boolean = false; 
  showConfirmPassword: boolean = false;  
  passwordMismatch: boolean = false;  
  emailAlreadyRegistered: boolean = false;
  showModal: boolean = false;  

  constructor(private authService: AuthService, private router: Router) {
    this.formData = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      username: new FormControl({ value: '', disabled: true }),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      address: new FormControl('', [Validators.required]),
      rol: new FormControl('', [Validators.required]),
    });
  }



  handleSubmit() {
    if (this.formData.valid) {
        this.authService.editUser(this.formData.value).subscribe({
            next: (data) => {
                this.showModal = true;  
                this.emailAlreadyRegistered = false; 
                this.formData.reset(); 
            },
            error: (err) => {
                if (err.status === 409) { 
                    this.emailAlreadyRegistered = true; 
                    this.formData.get('username')?.setErrors({ emailTaken: true }); 
                } else {
                    console.error('Error al registrar:', err); 
                }
            }
        });
    }
}


  closeModal() {
    this.showModal = false;
  }

  redirectToHome() {
    this.closeModal();
    this.router.navigate(['/home']);  
  }
}
