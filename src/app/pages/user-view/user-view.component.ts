import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { Response } from '../../interfaces/response';


@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.loadUsers(); 
  }

  loadUsers(): void {
    this.userService.getAllUser().subscribe({
        next: (data) => {
            this.users = data;   
        },
        error: (err) => {
            console.error('Error al obtener los Usuario:', err);
        }
    });
}

deleteUsers(userId: string ): void {
  this.userService.deleteUser(userId).subscribe(
    (response: Response) => {
      console.log('Usuario eliminado:', response);
      this.loadUsers(); 
    },
    (error) => {
      console.error('Error al eliminar el Usuario:', error);
    }
  );
}

 
}