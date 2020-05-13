import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {TimeAgoPipe} from 'time-ago-pipe';
import { PaginationModule, ButtonsModule, ModalModule } from 'ngx-bootstrap';


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ErrorIterceptorProvider } from './_services/error.interceptor';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { appRoutes } from './routes';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MembersDetailComponent } from './members/members-detail/members-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MembersEditComponent } from './members/members-edit/members-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { ListResolver } from './_resolvers/lists.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/hasRole.directive';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { AdminService } from './_services/Admin.service';
import { RolesModalComponent } from './admin/roles-modal/roles-modal.component';

// tslint:disable-next-line: use-pipe-transform-interface
@Pipe({
   name: 'timeAgo',
   pure: false
})
export class TimeAgoExtendsPipe extends TimeAgoPipe {}

export function GetToken() {
   return localStorage.getItem('token');
 }

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      RegisterComponent,
      HomeComponent,
      ListsComponent,
      MessagesComponent,
      MembersListComponent,
      MembersEditComponent,
      MembersListComponent,
      MemberCardComponent,
      MembersDetailComponent,
      PhotoEditorComponent,
      TimeAgoExtendsPipe,
      MemberMessagesComponent,
      AdminPanelComponent,
      HasRoleDirective,
      UserManagementComponent,
      PhotoManagementComponent,
      RolesModalComponent
   ],
   imports: [
      BrowserModule,
      PaginationModule.forRoot(),
      HttpClientModule,
      FileUploadModule,
      FormsModule,
      NgxGalleryModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      BsDatepickerModule.forRoot(),
      BrowserAnimationsModule,
      ButtonsModule.forRoot(),
      TabsModule.forRoot(),
      ModalModule.forRoot(),
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
           tokenGetter: GetToken,
           whitelistedDomains: ['localhost:5000'],
           blacklistedRoutes:  ['localhost:5000/auth']
         }
       })
   ],
   providers: [
      ErrorIterceptorProvider,
      MemberEditResolver,
      MemberDetailResolver,
      MemberListResolver,
      PreventUnsavedChanges,
      ListResolver,
      MessagesResolver,
      AdminService
   ],
   entryComponents : [
      RolesModalComponent
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
