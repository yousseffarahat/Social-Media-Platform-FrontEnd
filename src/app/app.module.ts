import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgxSpinnerModule} from "ngx-spinner";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatSortModule} from "@angular/material/sort";
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDividerModule} from "@angular/material/divider";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatInputModule} from "@angular/material/input";
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { TimelinePageComponent } from './timeline-page/timeline-page.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AllUsersListComponent } from './all-users-list/all-users-list.component';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {RequestInterceptor} from "./services/request.interceptor";
import {ErrorInterceptor} from "./services/error.interceptor";
import { AcceptedFriendsListComponent } from './accepted-friends-list/accepted-friends-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterPageComponent,
    LoginPageComponent,
    TimelinePageComponent,
    UserManagementComponent,
    PostsListComponent,
    CommentsListComponent,
    ProfilePageComponent,
    AllUsersListComponent,
    FriendsListComponent,
    NavbarComponent,
    AcceptedFriendsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    NgxSpinnerModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatSnackBarModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatExpansionModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }, {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
