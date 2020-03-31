import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authservice: AuthService, private alertify: AlertifyService, private route: Router) {

  }
    canActivate(): boolean {
      if (this.authservice.loggedIn()) {
        return true;
      }

      this.alertify.error('you shall not pass !!!');
      this.route.navigate(['/home']);
      return false;

  }

}
