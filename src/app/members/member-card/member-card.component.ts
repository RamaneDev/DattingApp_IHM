import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
@Input() user: User;
  constructor(private userService: UserService, private alert: AlertifyService, private authService: AuthService) { }

  ngOnInit() {
  }

  sendLike(user: User) {
    this.userService.sendLike(this.authService.decodeToken.nameid, user.id).subscribe(() => {
      this.alert.success('Like sent to ' + user.knownAs );
    }, error => {
      this.alert.error(error);
    });

  }

}
