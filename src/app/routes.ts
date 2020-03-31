import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MembersListComponent } from './members-list/members-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';

export const appRoutes: Routes = [
    { path: 'home',     component: HomeComponent },
    { path: 'members',  component: MembersListComponent },
    { path: 'messages', component: MessagesComponent },
    { path: 'lists',    component: ListsComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
