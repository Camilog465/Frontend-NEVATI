import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  username: string;
}

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  users: User[] = [];

  constructor() {}

  ngOnInit(): void {
    // Aquí puedes obtener los productos de tu servicio
    this.users = [
      { id: 1, username: 'a@correo.com' },
      { id: 2, username: 'b@correo.com' },
      { id: 3, username: 'c@correo.com'},
    ];
  }
}
