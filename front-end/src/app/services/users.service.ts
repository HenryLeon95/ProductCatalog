import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Bitacora } from '../models/Bitacora';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_URI = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  saveUser(user: User){
    return this.http.post(`${this.API_URI}/signup`, user);
  }

  getUsers(){
    return this.http.get(`${this.API_URI}/user`);
  }

  getUser(id: string){
    return this.http.get(`${this.API_URI}/user/${id}`);
  }
  
  deleteUser(id: string){
    return this.http.delete(`${this.API_URI}/user/${id}`)
  }

  //updateGame(id: string | number, updateGame: Game): Observable<Game>{
  updateUser(id: string | number, updateUsr: User){
    return this.http.put(`${this.API_URI}/user/${id}`, updateUsr);
  }

  updateStatus(id: string | number, updateUsr: User){
    return this.http.put(`${this.API_URI}/user/status/${id}`, updateUsr);
  }

  updateRol(id: string | number, updateUsr: User){
    return this.http.put(`${this.API_URI}/user/rol/${id}`, updateUsr);
  }

  updateCreit(id: string | number, updateUsr: User){
    return this.http.put(`${this.API_URI}/user/credit/${id}`, updateUsr);
  }

  updatePassword(updateUsr: User){
    return this.http.post(`${this.API_URI}/user/password`, updateUsr);
  }

  postRollBack(updateUsr: User){
    return this.http.post<any>(`${this.API_URI}/user/status`, updateUsr);
  }

  buscarUser(user){
    return this.http.post<any>(this.API_URI + '/user/search', user);
  }

  addsBitacora(bit){
    return this.http.post(`${this.API_URI}/bitacoras`, bit);
  }

  addBitacora(bit: Bitacora){
    return this.http.post(`${this.API_URI}/bitacora`, bit);
  }
}
