import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {TimelinePageComponent} from "./timeline-page/timeline-page.component";
import {PostsListComponent} from "./posts-list/posts-list.component";
import {ProfilePageComponent} from "./profile-page/profile-page.component";
import {CommentsListComponent} from "./comments-list/comments-list.component";
import {UserManagementComponent} from "./user-management/user-management.component";
import {AuthGuard} from "./services/auth.guard";
import {AdminAuthGuard} from "./services/adminAuth.guard";

const routes: Routes = [
  {path: 'register', component: RegisterPageComponent},
  {path: 'timeline', component: TimelinePageComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard]},
  {path: 'posts', component: PostsListComponent, canActivate: [AdminAuthGuard]},
  {path: 'comments', component: CommentsListComponent, canActivate: [AdminAuthGuard]},
  {path: 'users', component: UserManagementComponent, canActivate: [AdminAuthGuard]},
  {path: '**', component: LoginPageComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
