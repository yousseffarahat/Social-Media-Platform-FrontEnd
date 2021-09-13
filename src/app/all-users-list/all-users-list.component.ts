import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AuthenticationService} from "../services/authentication.service";
import {RestApiService} from "../services/rest-api.service";
import {User} from "../models/User";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-all-users-list',
  templateUrl: './all-users-list.component.html',
  styleUrls: ['./all-users-list.component.css']
})
export class AllUsersListComponent implements OnInit {
  usersList = [];
  dataSource = new MatTableDataSource(this.usersList);
  displayedColumns: string[] = ['firstName', 'lastName', 'actions'];
  user: User;

  constructor(private authService: AuthenticationService, private apiService: RestApiService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // @ts-ignore
    this.user = this.authService.getUserDetailsFromToken().user;
    this.getUsers();
  }

  getUsers() {
    this.apiService.getAllUsersForUser(this.user.id).subscribe(data=>{
      this.usersList = data;
      this.dataSource.data = data;
    },error => {
      console.log(error)
    })
  }

  addFriend(user) {
    const index = this.usersList.indexOf(user, 0);
    if (index > -1) {
      this.apiService.addFriend(this.user.id, user.id).subscribe(data => {
        this.usersList.splice(user, 1);
        this.dataSource.data= this.usersList;
        this.openSnackBar("Friend Request Sent","Dismiss");
      }, error => {
        console.log(error)
      })
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 2000
    });
  }
}
