import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthClientGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      if (this.authService.getRol() === 3) {
        return true;
      }
      else{
        console.log("Si entro, pero no es Cliente");
        this.router.navigate(['/acces-denied']);
        return true;
      }
    }

    this.router.navigate(['/login']);
    return false
  }
  
}
