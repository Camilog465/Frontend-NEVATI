

import { Component, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, Routes } from '@angular/router';
import { Subscription } from 'rxjs';

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
  suscription !: Subscription;

  constructor(private authService : AuthService, private router:Router ) {
    this.formData = new FormGroup({
      name: new FormControl( '', [ Validators.required ] ),
      lastname: new FormControl( '', [ Validators.required ] ),
      username: new FormControl( '', [ Validators.required, Validators.email ] ),
      password: new FormControl( '', [ Validators.required, Validators.minLength( 8 ), Validators.maxLength( 20 ) ] ),
      phone: new FormControl( '', [ Validators.required, Validators.minLength( 10 ) ] ),
      address: new FormControl( '', [ Validators.required ] )
      
    });
  }

  ngOnChanges (changes: SimpleChanges): void {
    console.log('ngonchanges');
  }
  ngOnInit (): void {
    console.log('ngoninit');
  }
  ngOnDestroy (): void {
    console.log('ngondestroy');
    if(this.suscription){
      this.suscription.unsubscribe ()
    }
    
  }

  handleSubmit() {
    if(this.formData.valid) {
      console.log(this.formData.value);
      this.suscription = this.authService.registerUser(this.formData.value).subscribe((data) => {
        console.log(data);
        this.message = data;
        setTimeout(()=>{
          this.message = '';
        },2000)
        this.router.navigateByUrl('register');
    
    });
    this.formData.reset();
    
  }
}
}