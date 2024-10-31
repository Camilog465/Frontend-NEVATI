import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, tap, of, map, catchError } from 'rxjs';
import { Product } from '../interfaces/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
    private token;
    private headers!: HttpHeaders;

    constructor(private http: HttpClient) {
        this.token = localStorage.getItem ('token') || '';
        this.headers = new HttpHeaders ().set ('X-token',this.token)
     }

    getAllProducts(){
        return this.http.get<any>('http://localhost:3000/api/products')
    }

    registerProduct(productData: Product): Observable<any> {
         return this.http.post<any>('http://localhost:3000/api/products', productData, {headers:this.headers})
        .pipe(
            tap((response) => {
                console.log('Respuesta del servidor:', response); // Imprimir la respuesta del servidor
            }),
            catchError(error => {
                console.error('Error al registrar el producto:', error);
                return of('Error al registrar el producto');
            })
        );
    }

    deleteProduct (id: any){
        return this.http.delete ('http://localhost:3000/api/products/'+(id), {headers:this.headers})

    }

    getProductById (id: any){
        return this.http.get <any> ('http://localhost:3000/api/products/'+(id), {headers:this.headers})
    }

    updateProduct (id:any, data: any){
       return this.http.patch <any> ('http://localhost:3000/api/products/'+(id), data, {headers:this.headers})

    }
}
