import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {RestApiService} from "../services/rest-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit, AfterViewInit {
  postsList = [];
  postsDataSource = new MatTableDataSource(this.postsList);
  displayedColumns: string[] = ['firstName', 'lastName', 'content', 'likes','actions'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.postsDataSource.paginator = this.paginator;
    this.postsDataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.postsDataSource.filter = filterValue.trim().toLowerCase();

    if (this.postsDataSource.paginator) {
      this.postsDataSource.paginator.firstPage();
    }
  }

  constructor( private apiService: RestApiService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.apiService.getAdminPosts().subscribe(data=>{
      this.postsList = data;
      this.postsDataSource.data = data;
    }, error =>{
      console.log(error)
    })
  }

  deletePost(post) {
    const index = this.postsList.indexOf(post, 0);
    if (index > -1) {
      this.apiService.deletePost(post.id).subscribe(data =>{
        this.postsList.splice(index, 1);
        this.postsDataSource.data= this.postsList;
        this.openSnackBar("Successfully deleted Post","Dismiss");
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
