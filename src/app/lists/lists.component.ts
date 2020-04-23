import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { PaginatedResult, Pagination } from '../_models/pagination';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

users: User[];
pagination: Pagination;
likesParam: string;

  constructor(private userService: UserService, private alertifyService: AlertifyService, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.likesParam = 'Likers';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUser();
  }

  loadUser() {
    this.userService
        .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
        .subscribe((resp: PaginatedResult<User[]>) => {
      this.users = resp.result;
      this.pagination = resp.pagination;
    }, error => {
      this.alertifyService.error(error);
    });
  }

}
