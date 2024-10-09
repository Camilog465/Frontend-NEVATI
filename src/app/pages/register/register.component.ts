import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formData!: FormGroup;

  constructor( private authService: AuthService ) {
    this.formData = new FormGroup({
      name: new FormControl( '', [ Validators.required ] ),
      username: new FormControl( '', [ Validators.required, Validators.email ] ),
      password: new FormControl( '', [ Validators.required, Validators.minLength( 8 ), Validators.maxLength( 20 ) ] )
    });
  }

  handleSubmit() {
    if(this.formData.valid) {
      console.log(this.formData.value);
      this.authService.registerUser( this.formData.value ).subscribe( function( data ) {
        console.log(data);
      });
      this.formData.reset();
    }
  }

}
