import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { TabsModule } from 'ngx-bootstrap/tabs';


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ErrorIterceptorProvider } from './_services/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { appRoutes } from './routes';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MembersDetailComponent } from './members/members-detail/members-detail.component';

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
      MembersListComponent,
      MemberCardComponent,
      MembersDetailComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule,
      TabsModule.forRoot(),
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
      ErrorIterceptorProvider
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
