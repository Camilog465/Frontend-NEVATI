

import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ RouterLink,  ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formData!: FormGroup;
  message: string | undefined;

  constructor(private authService : AuthService ) {
    this.formData = new FormGroup({
      name: new FormControl( '', [ Validators.required ] ),
      lastname: new FormControl( '', [ Validators.required ] ),
      username: new FormControl( '', [ Validators.required, Validators.email ] ),
      password: new FormControl( '', [ Validators.required, Validators.minLength( 8 ), Validators.maxLength( 20 ) ] ),
      phone: new FormControl( '', [ Validators.required, Validators.minLength( 10 ) ] ),
      address: new FormControl( '', [ Validators.required ] )
      
    });
  }


  handleSubmit() {
    if(this.formData.valid) {
      console.log(this.formData.value);
      this.authService.registerUser(this.formData.value).subscribe((data) => {
        console.log(data);
        this.message = data;
        setTimeout(()=>{
          this.message = '';
        },2000)
    
    });
    this.formData.reset();
  }
}
}