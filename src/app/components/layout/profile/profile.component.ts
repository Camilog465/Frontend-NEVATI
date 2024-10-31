import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router'; 
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 



@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  formData!: FormGroup;
  showPassword: boolean = false; 
  showActualPassword: boolean = false; 
  showConfirmPassword: boolean = false;  
  passwordMismatch: boolean = false;  
  emailAlreadyRegistered: boolean = false;
  showModal: boolean = false; 
  
  constructor(private authService: AuthService, private router: Router) {
    this.formData = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      username: new FormControl({ value: '', disabled: true }),
      actualPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      confirmPassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      address: new FormControl('', [Validators.required])
    });
  }

  validatePasswords() {
    const registerPassword = this.formData.get('password')?.value;
    const confirmPassword = this.formData.get('confirmPassword')?.value;
    this.passwordMismatch = registerPassword !== confirmPassword;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleActualPassword() {
    this.showActualPassword = !this.showActualPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  handleSubmit() {
    this.validatePasswords();
    if (this.formData.valid && !this.passwordMismatch) {
        this.authService.registerUser(this.formData.value).subscribe({
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
