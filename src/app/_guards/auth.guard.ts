import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { TypeaheadOptions } from 'ngx-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authservice: AuthService, private alertify: AlertifyService, private route: Router) {

  }
    canActivate(next: ActivatedRouteSnapshot): boolean {
      const roles = next.firstChild.data['roles'] as Array<string>;
      if (roles) {
        const match = this.authservice.roleMatch(roles);
        if (match) {
          return true;
        } else {
          this.route.navigate(['members']);
          this.alertify.error('You are not authorised to access this area');
        }
      }
      if (this.authservice.loggedIn()) {
        return true;
      }

      this.alertify.error('you shall not pass !!!');
      this.route.navigate(['/home']);
      return false;

  }

}
