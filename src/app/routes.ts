import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MembersDetailComponent } from './members/members-detail/members-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MembersEditComponent } from './members/members-edit/members-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ListResolver } from './_resolvers/lists.resolver';

export const appRoutes: Routes = [
    { path: '',     component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members',  component: MembersListComponent, resolve: {users: MemberListResolver}  },
            { path: 'members/:id',  component: MembersDetailComponent, resolve: {user: MemberDetailResolver} },
            { path: 'member/edit',  component: MembersEditComponent, resolve: {user: MemberEditResolver},
                     canDeactivate: [PreventUnsavedChanges] },
            { path: 'messages', component: MessagesComponent },
            { path: 'lists',    component: ListsComponent, resolve: {users: ListResolver} }
        ]


    },

    { path: '**', redirectTo: '', pathMatch: 'full' }
];
