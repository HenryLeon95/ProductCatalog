import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  saveProduct(producto: Producto){
    return this.http.post(`${this.API_URI}/product`, producto);
  }
  
  getProducto(pro){
    return this.http.post<any>(this.API_URI + '/getProduct', pro);
  }
  
  getProducto2(pro){
    return this.http.post<any>(this.API_URI + '/getProduct2', pro);
  }

  putProduct(id: string | number, producto: Producto){
    return this.http.put(`${this.API_URI}/product/${id}`, producto);
  }

  deleteProduct(id: string){
    return this.http.delete(`${this.API_URI}/product/${id}`)
  }
}
