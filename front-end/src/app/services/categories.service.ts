import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  API_URI = 'http://localhost:3000/api'//Aquí hacemos la petición para la Api-Rest

  constructor(private http: HttpClient) { }

  getCategoria(cat){
    return this.http.post<any>(this.API_URI + '/category', cat);
  }

  getSubCategoria(cat){
    return this.http.post<any>(this.API_URI + '/category2', cat);
  }

  getCategoriaG(cat){
    return this.http.post<any>(this.API_URI + '/category3', cat);
  }

  getCategoriaG2(cat){
    return this.http.post<any>(this.API_URI + '/category4', cat);
  }

  getUno(id: string){
    return this.http.get(`${this.API_URI}/categories/${id}`);
  }

  saveCategory(categoria: Category){
    return this.http.post(`${this.API_URI}/categories`, categoria);
  }

  putCategory(id: string | number, categoria: Category){
    return this.http.put(`${this.API_URI}/categories/${id}`, categoria);
  }

  deleteCategory(id: string){
    return this.http.delete(`${this.API_URI}/categories/${id}`)
  }
}
