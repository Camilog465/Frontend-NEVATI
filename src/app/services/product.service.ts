import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, tap, of, map, catchError } from 'rxjs';
import { Product } from '../interfaces/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  registerProduct(productData: Product): Observable<{ success: boolean, msg: string }> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
        'X-Token': token ? token : '',
    });

    return this.http.post<{ success: boolean, msg: string }>('http://localhost:3000/api/products', productData, { headers })
        .pipe(
            tap((response) => {
                console.log('Respuesta del servidor:', response); // Imprimir la respuesta del servidor
            }),
            catchError(error => {
                console.error('Error al registrar el producto:', error);
                return of({ success: false, msg: 'Error al registrar producto' });
            })
        );
}

}