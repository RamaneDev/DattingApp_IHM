import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {

  users: User[];
  pagination: Pagination;
  constructor(private userService: UserService, private alertifyService: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
  }


  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUser();
  }

  loadUser() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage)
        .subscribe((resp: PaginatedResult<User[]>) => {
      this.users = resp.result;
      this.pagination = resp.pagination;
    }, error => {
      this.alertifyService.error(error);
    });
  }
}
