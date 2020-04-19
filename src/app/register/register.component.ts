import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  registerForm: FormGroup;
  @Output()
  cancelRegister = new EventEmitter();
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authservice: AuthService, private alertifyService: AlertifyService,
              private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this.createRegisterfrom();
  }

  createRegisterfrom() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validators: this.confirmPasswordValidator});
  }

  confirmPasswordValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true};
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authservice.register(this.user).subscribe(next => {
        this.alertifyService.success('register successfuly');
      }, error => {
         this.alertifyService.error(error);
      }, () => {
        this.authservice.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }

    console.log(this.registerForm.value);
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelation !');
  }

}
