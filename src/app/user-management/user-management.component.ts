import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {RestApiService} from "../services/rest-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  usersList = [];
  dataSource = new MatTableDataSource(this.usersList);
  displayedColumns: string[] = ['firstName', 'lastName', 'active', 'actions'];

  constructor(private apiService: RestApiService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.apiService.getAdminUsers().subscribe(data=>{
      this.usersList = data;
      this.dataSource.data = data;
    }, error =>{
      console.log(error)
    })
  }

  deactivateUser(user) {
    this.apiService.deactivateUser(user.id).subscribe(data =>{
      user.activated = false;
    },error => {
      console.log(error)
    })
  }

  activateUser(user) {
    this.apiService.activateUser(user.id).subscribe(data =>{
      user.activated = true;
    },error => {
      console.log(error)
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 2000
    });
  }
}
