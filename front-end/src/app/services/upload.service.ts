import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  API_URI = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  saveFile(file, name){
    return this.http.post(`${this.API_URI}/upload`, {file, name});
  }

  sendEmail(correo, cod_temp){
    return this.http.post(`${this.API_URI}/sendEmail`, {correo, cod_temp});
  }

  sendEmail2(correo, clave){
    return this.http.post(`${this.API_URI}/sendEmail2`, {correo, clave});
  }

  sendEmail3(correo, clave){
    return this.http.post(`${this.API_URI}/sendEmail3`, {correo, clave});
  }
}
