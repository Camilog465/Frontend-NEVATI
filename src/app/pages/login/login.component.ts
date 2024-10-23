import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule,RouterLink, RouterLinkActive ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formData!: FormGroup;
  message: string|undefined;

  constructor(private authservice: AuthService) {
    this.formData = new FormGroup({
      username: new FormControl( '', [ Validators.required, Validators.email ] ),
      password: new FormControl( '', [ Validators.required, Validators.minLength( 8 ), Validators.maxLength( 20 ) ] )
    });
  }

   handleSubmit() {
     if( this.formData.valid ) {
      console.log(this.formData.value);
      this.authservice.loginUser (this.formData.value).subscribe((data) => {
       console.log(data);
       //this.message = data;
       setTimeout(()=>{
         this.message = '';

       },2000)
      });
      this.formData.reset();
    
     }
   } 
 }  
    
    
    
    
  
