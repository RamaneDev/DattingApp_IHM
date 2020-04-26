import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';
import { Message } from '../_models/message';
import { AuthService } from '../_services/auth.service';




@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
  pageNumber = 1;
  pageSize = 5;
  messagesContainter = 'Unread';

  constructor(private userService: UserService, private router: Router,
              private alertify: AlertifyService, private authservice: AuthService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
    console.log('resolver');
    return this.userService.getMessages(this.authservice.decodeToken.nameid, this.pageNumber,
                this.pageSize, this.messagesContainter).pipe(
        catchError(error => {
            this.alertify.error('Problem retrieving Messages');
            this.router.navigate(['/home']);
            return of(null);
        })
    );
  }
}
