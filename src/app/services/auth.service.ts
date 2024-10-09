import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface User { name: string, username: string, password: string }

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** Forma anterior a la version Angular 16 */
  constructor( private http: HttpClient ) { }

  registerUser ( newUser: User ) {
    return this.http.post( 'http://localhost:3000/api/auth/register', newUser );
  }
}