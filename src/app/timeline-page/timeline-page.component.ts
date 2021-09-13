import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {RestApiService} from "../services/rest-api.service";
import {User} from "../models/User";
import {Post} from "../models/Post";
import {PostRequest} from "../models/PostRequest";
import {CommentRequest} from "../models/CommentRequest";

@Component({
  selector: 'app-timeline-page',
  templateUrl: './timeline-page.component.html',
  styleUrls: ['./timeline-page.component.css']
})
export class TimelinePageComponent implements OnInit {
  postsList = [];
  tempPost: any;
  tempUploadedImage: any;
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
    this.apiService.getPosts(String(this.pageNumber),this.user.id).subscribe(data=>{
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

  submitPost() {
    if(this.tempPost && this.tempPost!=""){
      const request = new PostRequest(this.user.id,this.tempPost,this.tempUploadedImage);
      this.apiService.submitPost(request).subscribe(data=>{
        this.postsList.push(data)
        this.tempPost = "";
        this.tempUploadedImage = null;
      },error => {
        console.log(error);
      })
    }
  }

  onFileSelected(event) {
    const files = event.target.files;
    const file = files[0];

    if (files && file) {
      const reader = new FileReader();

      reader.onload =this.handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.tempUploadedImage= btoa(binaryString);
  }

  checkLikes(post: Post) {
    return (post.likes && post.likes.includes(this.user.id));
  }
}
