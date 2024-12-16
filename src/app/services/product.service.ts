import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, tap, of, map, catchError } from 'rxjs';
import { Product } from '../interfaces/product';
import { ResponsePro } from '../interfaces/response';


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
                console.log('Respuesta del servidor:', response); 
            }),
            catchError(error => {
                console.error('Error al registrar el producto:', error);
                return of({ success: false, msg: 'Error al registrar producto' });
            })
        );

    }

    getAllProducts(): Observable<Product[] | undefined | any[]> {
        return this.http.get<any>('http://localhost:3000/api/products')
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
                    console.error('Error al obtener los productos:', error);
                    return of([]);  
                })
            );
    }

    getProduct(productId: string): Observable<ResponsePro> {
        return this.http.get<ResponsePro>(`http://localhost:3000/api/products/${productId}`);
    }
    
    
    getProductById(productId: string): Observable<Product | undefined | any > {
        return this.http.get<ResponsePro>(`http://localhost:3000/api/products/${productId}`)
            .pipe(
                map( ( data ) => {
                    return data.data
                }),
                catchError( err => of( [] ) )
            );
    }

    editProduct(productId: string, productData: Product): Observable<any> { 
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'X-Token': token ? token : '',
        });
        return this.http.patch(`http://localhost:3000/api/products/${productId}`, productData, { headers });
    }
    deleteProduct(productId: string): Observable<ResponsePro> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'X-Token': token ? token : '',
        });
        return this.http.delete<ResponsePro>(`http://localhost:3000/api/products/${productId}`, { headers });
    }
}