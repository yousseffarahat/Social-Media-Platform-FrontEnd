import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../models/User";
import {AuthenticationService} from "../services/authentication.service";
import {RestApiService} from "../services/rest-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-accepted-friends-list',
  templateUrl: './accepted-friends-list.component.html',
  styleUrls: ['./accepted-friends-list.component.css']
})
export class AcceptedFriendsListComponent implements OnInit {
  usersList = [];
  dataSource = new MatTableDataSource(this.usersList);
  displayedColumns: string[] = ['firstName', 'lastName'];
  user: User;

  constructor(private authService: AuthenticationService, private apiService: RestApiService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.user = this.authService.getUserDetailsFromToken().user;
    this.getUsers();
  }

  getUsers() {
    this.apiService.getAllUserFriends(this.user.id).subscribe(data=>{
      this.usersList = data;
      this.dataSource.data = data;
    },error => {
      console.log(error)
    })
  }
}
