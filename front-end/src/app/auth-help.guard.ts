import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthHelpGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      if (this.authService.getRol() === 2) {
        return true;
      }
      else{
        console.log("Si entro, pero no es Servicio de Ayuda");
        this.router.navigate(['/acces-denied']);
        return true;
      }
    }

    this.router.navigate(['/login']);
    return false
  }
}
