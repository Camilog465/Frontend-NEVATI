
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../interfaces/response';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 //private authUserdata !: User|null = null;
 private _authUserData : User|null = null;

  constructor(private http:HttpClient) {
  }

 /** Getters */
 get userData(): User | null {
  const storedData = localStorage.getItem('authUserData');

  // Verifica si storedData no es null ni undefined, además si el contenido es válido JSON
  return this._authUserData || ( storedData && storedData !== 'undefined' ? JSON.parse(storedData) : null);
}


registerUser ( newUser: User ): Observable<string|undefined> {
  return this.http.post<Response>( 'http://localhost:3000/api/auth/register', newUser )
    .pipe(
      tap( ( data ) => {
        console.log( data );
      }),
      map( ( data ) => {
        if( ! data.ok )
          return data.msg;

        return 'Registro realizado con éxitosamente';
      } ),
      catchError( error => of ( 'Error en el servidor' ) )
    );
}

loginUser( credencials: User ): Observable<string|boolean|undefined> {
  return this.http.post<Response>( 'http://localhost:3000/api/auth/login', credencials )
    .pipe(
      tap( data => {

        if( data.token ) {

          // Verifica si los datos del usuario existen y no son undefined
          if( data.data ) {
            console.log('Datos del usuario a guardar:', data.data); // <-- Agrega este console.log para depurar
            this._authUserData = data.data;  // En el servicio
            localStorage.setItem( 'authUserData', JSON.stringify(data.data)); // En localStorage
          }
      
          // Guarda el Token
          localStorage.setItem( 'token', data.token );
        }
        
      }),
      map( data => {
        if( ! data.ok ) {
          return data.msg;
        }
          
        return data.ok;
      }),
      catchError( error => of ( 'Error en el servidor' ) )
    );
}

logoutUser(): Observable<boolean> {
  if( this._authUserData ) {
    this._authUserData = null;                  // Elimina datos del usuario autenticado en el Servicio
    localStorage.removeItem( 'token' );         // Elimina token del LocalStorage
    localStorage.removeItem( 'authUserData' );  // Elimina datos del usuario autenticado en el LocalStorage
  }

  return of( true );
}
verifyAuthUser():Observable<boolean>{
  const token = localStorage.getItem('token')||'';
  const headers = new HttpHeaders().set('X-Token',token)
  return this.http.get<Response>('http://localhost:3000/api/auth/re-new-token',{headers})
  .pipe(
    tap((data) => {
      if (data.token) {
        localStorage.setItem('token',data.token)
      }
      else{
        localStorage.removeItem('token')
      }
    }),     
    map((data) => {
      return data.ok
    }),
    catchError((error) => {
      return of (false)
    })
  )
}
isLoggedIn(): boolean {
  return !!localStorage.getItem('token'); 
}

}



  


    

