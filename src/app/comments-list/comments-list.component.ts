import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {RestApiService} from "../services/rest-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
  commentsList = [];
  dataSource = new MatTableDataSource(this.commentsList);
  displayedColumns: string[] = ['firstName', 'lastName', 'content','actions'];


  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  constructor(private apiService: RestApiService, private _snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.apiService.getAdminComments().subscribe(data=>{
      this.commentsList = data;
      this.dataSource.data = data;
    }, error =>{
      console.log(error)
    })
  }

  deleteComment(comment) {
    const index = this.commentsList.indexOf(comment, 0);
    if (index > -1) {
      this.apiService.deleteComment(comment.id).subscribe(data =>{
        this.commentsList.splice(comment, 1);
        this.dataSource.data= this.commentsList;
        this.openSnackBar("Successfully deleted Comment","Dismiss");
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
