import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule,RouterLinkActive],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  userEditForm!: FormGroup;
  showModal: boolean = false;
  userId!: string; 
  emailAlreadyRegistered: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userEditForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      username: new FormControl({ value: '', disabled: true }),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      address: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.loadUser(this.userId); 
    });
  }

  loadUser(userId: string): void {
    console.log(userId)
    this.subscription = this.userService
      .getUserById(userId)
      .subscribe(({ name, lastname, username, phone, address, role }) => {
     
  
        this.userEditForm.setValue({
          name, 
          lastname, 
          username, 
          phone, 
          address, 
          role
        });
    });
}


  onSubmit() {
    if (this.userEditForm.valid) {
      const formData = this.userEditForm.value;
      this.subscription = this.userService.editUser(this.userId, formData).subscribe({
        next: (response) => {
          if (response.ok) {
            this.showModal = true;
            this.emailAlreadyRegistered = false; 
          }
        },
        error: (err) => {
          if (err.status === 409) { 
            this.emailAlreadyRegistered = true;
            this.userEditForm.get('username')?.setErrors({ emailTaken: true });
          } else {
            console.error('Error al editar el usuario:', err);
          }
        }
      });
    } else {
      console.log('El formulario no es vÃ¡lido');
    }
  }

  closeModal() {
    this.showModal = false;
  }

  handleAccept() {
    this.closeModal();
    this.userEditForm.reset();
    this.router.navigate(['/user/view']);  
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

