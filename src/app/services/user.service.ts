import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map, catchError } from 'rxjs';
import { Response } from '../interfaces/response';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


    getAllUser(): Observable<User[]> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'X-Token': token ? token : '',
        });
        return this.http.get<{ ok: boolean, data: User[] }>('http://localhost:3000/api/users/', { headers })
            .pipe(
                map(response => {
                    if (response.ok) {
                        return response.data; 
                    } else {
                        console.error('La respuesta no es correcta:', response);
                        return [];
                    }
                }),
                catchError(error => {
                    console.error('Error al obtener los usuarios:', error);
                    return of([]);  
                })
            );
    }

    getUser(userId: string): Observable<Response> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'X-Token': token ? token : '',
        });
        return this.http.get<Response>(`http://localhost:3000/api/users/${userId}`, { headers });
    }
    
    
    getUserById(userId: string): Observable<Response> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'X-Token': token ? token : '',
        });
        return this.http.get<Response>(`http://localhost:3000/api/users/${userId}`, { headers });
    }

    editUser(userId: string, userData: User): Observable<Response> { 
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'X-Token': token ? token : '',
        });
        return this.http.patch<Response>(`http://localhost:3000/api/users/${userId}`, userData, { headers });
    }
    
    
    deleteUser(userId: string): Observable<Response> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'X-Token': token ? token : '',
        });
        return this.http.delete<Response>(`http://localhost:3000/api/users/${userId}`, { headers });
    }
    
    
}