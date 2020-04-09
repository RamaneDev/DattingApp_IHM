import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-members-edit',
  templateUrl: './members-edit.component.html',
  styleUrls: ['./members-edit.component.css']
})
export class MembersEditComponent implements OnInit {
  user: User;
  @ViewChild('editForm') editform: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    $event.returnValue = true;
  }

  constructor(private route: ActivatedRoute, private alert: AlertifyService) { }

  ngOnInit() {
  this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    console.log(this.user);
    this.alert.success('update user success !');
    this.editform.reset(this.user);

  }

}
