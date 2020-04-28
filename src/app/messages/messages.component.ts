import { Component, OnInit } from '@angular/core';
import { Pagination } from '../_models/pagination';
import { Message } from '../_models/message';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer: string;

  constructor(private userService: UserService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private alertfy: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
      this.messageContainer = 'Unread';
    });
  }

  loadMessages() {
    this.userService.getMessages(this.authService.decodeToken.nameid,
                                 this.pagination.currentPage, this.pagination.itemsPerPage,
                                 this.messageContainer).subscribe(response => {
                                   this.messages = response.result;
                                   this.pagination = response.pagination;
                                 }, error => {
                                   this.alertfy.error(error);
                                 });
  }

  deleteMessage(id: number) {
    this.alertfy.confirm('Are you sure you want to delete this message', () => {
      this.userService.deleteMessage(id, this.authService.decodeToken.nameid).subscribe(() => {
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.alertfy.success('Message has been deleted');
      }, error => {
        this.alertfy.error(error);
      });
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }


}
