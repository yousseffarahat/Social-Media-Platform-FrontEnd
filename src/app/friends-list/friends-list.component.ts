import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthenticationService} from "../services/authentication.service";
import {User} from "../models/User";
import {RestApiService} from "../services/rest-api.service";

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {
  friendsList = [];
  dataSource = new MatTableDataSource(this.friendsList);
  displayedColumns: string[] = ['firstName', 'lastName', 'actions'];
  user: User;

  constructor(private authService: AuthenticationService,private apiService: RestApiService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // @ts-ignore
    this.user = this.authService.getUserDetailsFromToken().user;
    this.getUsers();
  }

  getUsers() {
    this.apiService.getFriendRequests(this.user.id).subscribe(data=>{
      this.friendsList = data;
      this.dataSource.data = data;
    },error=>{
      console.log(error)
    })
  }

  rejectRequest(request) {
    const index = this.friendsList.indexOf(request, 0);
    if (index > -1) {
      this.apiService.rejectFriendRequest(request.userId, request.friendId).subscribe(data => {
        this.friendsList.splice(request, 1);
        this.dataSource.data= this.friendsList;
        this.openSnackBar("Rejected Friend Request","Dismiss");
      }, error => {
        console.log(error)
      })
    }
  }

  acceptRequest(request) {
    const index = this.friendsList.indexOf(request, 0);
    if (index > -1) {
      this.apiService.acceptFriendRequest(request.userId, request.friendId).subscribe(data => {
        this.friendsList.splice(request, 1);
        this.dataSource.data= this.friendsList;
        this.openSnackBar("Accepted Friend Request","Dismiss");
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
