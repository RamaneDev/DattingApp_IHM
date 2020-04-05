import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};

  @Output()
  cancelRegister = new EventEmitter();

  constructor(private authservice: AuthService, private alertifyService: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this.authservice.register(this.model).subscribe(next => {
      this.alertifyService.success('register successfuly');
    }, error => {
       this.alertifyService.error(error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelation !');
  }

}
