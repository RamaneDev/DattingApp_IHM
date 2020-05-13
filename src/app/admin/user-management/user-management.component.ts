import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/Admin.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { RolesModalComponent } from '../roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[];
  bsModalRef: BsModalRef;
  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getUsersWithRoles();
  }

  openModalWithComponent(user: User) {
    const initialState = {
     user,
     roles: this.getRolesArry(user)
    };
    this.bsModalRef = this.modalService.show(RolesModalComponent, {initialState});
    this.bsModalRef.content.updateSelectedRoles.subscribe((values) => {
      const rolesToUpdate = {
        roleNames: [...values.filter(el => el.checked === true).map(el => el.name)]
      };
      this.adminService.updateUserRoles(user, rolesToUpdate).subscribe(() => {
        user.roles = [...rolesToUpdate.roleNames];
      }, error => {
        console.log(error);
      });
    });
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe((users: User[]) => {
      this.users = users;
    }, error => {
      console.log(error);
    });
  }

  private getRolesArry(user: any) {
    const roles = [];
    const userRoles = user.roles;
    const availabelRoles: any[] = [
      {name: 'Admin', value: 'Admin'},
      {name: 'Moderator', value: 'Moderator'},
      {name: 'Member', value: 'Member'},
      {name: 'VIP', value: 'VIP'}
    ];

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < availabelRoles.length; i++) {
      let isMatch = false;
      // tslint:disable-next-line: prefer-for-of
      for (let j = 0; j < userRoles.length; j++) {
        if (availabelRoles[i].name === userRoles[j]) {
          isMatch = true;
          availabelRoles[i].checked = true;
          roles.push(availabelRoles[i]);
          break;
        }
      }
      if (!isMatch) {
        availabelRoles[i].checked = false;
        roles.push(availabelRoles[i]);
      }

    }

    return roles;
  }
}
