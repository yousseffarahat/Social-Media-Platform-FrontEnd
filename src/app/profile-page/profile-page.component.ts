import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {RestApiService} from "../services/rest-api.service";
import {User} from "../models/User";
import {CommentRequest} from "../models/CommentRequest";
import {Post} from "../models/Post";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  postsList = [];
  user: User;
  pageNumber = 0;
  totalPostsNumber = 0;
  constructor(private authService: AuthenticationService, private apiService: RestApiService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.user = this.authService.getUserDetailsFromToken().user;
    this.getPosts();
  }

  getPosts(){
    this.apiService.getProfilePosts(String(this.pageNumber),this.user.id).subscribe(data=>{
      this.totalPostsNumber = data.totalElements;
      this.postsList = this.postsList.concat(data.content)
      this.pageNumber = this.pageNumber + 1;
    },error => {
      console.log(error);
    });
  }

  likePost(post){
    if(post.likes.includes(this.user.id)){
      this.apiService.unlikePost(this.user.id,post.id).subscribe(data=>{
        post.likes = post.likes.filter(like => like !== this.user.id);
      },error => {
        console.log(error);
      })
    }else{
      this.apiService.likePost(this.user.id,post.id).subscribe(data=>{
        post.likes.push(this.user.id);
      },error => {
        console.log(error);
      })
    }
  }

  getThumbsUpIconClass(post){
    if (post.likes && post.likes.includes(this.user.id)){
      return "timeline-like-button-active"
    }else{
      return "timeline-like-button-inactive"
    }
  }

  submitComment(post){
    console.log(post.tempComment)
    if(post.tempComment && post.tempComment!=""){
      let request = new CommentRequest(post.id,this.user.id,post.tempComment);
      this.apiService.submitComment(request).subscribe(data =>{
        post.comments = post.comments.concat(data);
        post.tempComment = null;
      },error => {
        console.log(error);
      })
    }
  }

  checkLikes(post: Post) {
    return (post.likes && post.likes.includes(this.user.id));
  }
}
