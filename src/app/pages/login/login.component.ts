import { Component, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { Subscription } from 'rxjs';

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
  suscrption !: Subscription;
  

  constructor(private authservice: AuthService, private router:Router) {
    this.formData = new FormGroup({
      username: new FormControl( '', [ Validators.required, Validators.email ] ),
      password: new FormControl( '', [ Validators.required, Validators.minLength( 8 ), Validators.maxLength( 20 ) ] )
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
    if(this.suscrption){
      this.suscrption.unsubscribe ()
    }
    
  }

   handleSubmit() {
     if( this.formData.valid ) {
      console.log(this.formData.value);
      this.suscrption = this.authservice.loginUser (this.formData.value).subscribe((data) => {
       console.log(data);
       //this.message = data;
       setTimeout(()=>{
         this.message = '';

       },2000)
       this.router.navigateByUrl('home')
      });

      this.formData.reset();
     }
   } 
   
 }  
    
    
    
    
  
