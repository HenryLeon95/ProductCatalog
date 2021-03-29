import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URI = 'http://localhost:3000/api'

  constructor(private http: HttpClient, private router: Router) { }

  signIn(user){
    return this.http.post<any>(this.API_URI + '/login', user);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
  }

  getUser(): number{
    const id_ = parseInt(localStorage.getItem('id'));
    return id_;
  }

  getRol(): number{
    const rol_ = parseInt(localStorage.getItem('rol'));
    return rol_;
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('rol');
    this.router.navigate(['/login']);
  }
}
