import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ResponseMessage} from "../models/ResponseMessage";
import {Page} from "../models/page";
import {Post} from "../models/Post";
import {User} from "../models/User";
import {FriendRequest} from "../models/FriendRequest";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  checkUsername(username) {
    return this.http.get<boolean>(this.apiUrl + 'users/checkUsername/' + username, this.httpOptions);
  }

  registerUser(userRequest){
    return this.http.post<ResponseMessage>(this.apiUrl + 'users/', JSON.stringify(userRequest), this.httpOptions);
  }

  login(loginRequest){
    return this.http.post<ResponseMessage>(this.apiUrl + 'users/login', JSON.stringify(loginRequest), this.httpOptions);
  }

  likePost(userId, postId){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),

      params: new HttpParams()
        .set('userId', userId)
    };
    return this.http.put<ResponseMessage>(this.apiUrl + 'posts/like/' + postId,{}, httpOptions);
  }

  unlikePost(userId, postId){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),

      params: new HttpParams()
        .set('userId', userId)
    };
    return this.http.delete<ResponseMessage>(this.apiUrl + 'posts/like/' + postId, httpOptions);
  }

  getPosts(pageNo: string, userId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),

      params: new HttpParams()
        .set('page', pageNo)
        .set('size', "5")
        .set('userId', userId)
    };
    return this.http.get<Page>(this.apiUrl + 'posts/', httpOptions);
  }

  submitPost(postRequest){
    return this.http.post<Post>(this.apiUrl + 'posts/', JSON.stringify(postRequest), this.httpOptions);
  }

  submitComment(commentRequest){
    return this.http.post<Comment>(this.apiUrl + 'posts/comments/', JSON.stringify(commentRequest), this.httpOptions);
  }

  getAdminPosts(){
    return this.http.get<Post[]>(this.apiUrl + 'posts/posts', this.httpOptions);
  }

  deletePost(id) {
    return this.http.delete<ResponseMessage>(this.apiUrl + 'posts/'+id, this.httpOptions);
  }

  deleteComment(id) {
    return this.http.delete<ResponseMessage>(this.apiUrl + 'posts/comments/'+id, this.httpOptions);
  }

  getAdminComments() {
    return this.http.get<Comment[]>(this.apiUrl + 'posts/comments', this.httpOptions);
  }

  getAdminUsers() {
    return this.http.get<User[]>(this.apiUrl + 'users/', this.httpOptions);
  }

  deactivateUser(id) {
    return this.http.put<ResponseMessage>(this.apiUrl + 'users/deactivate/' +id,{}, this.httpOptions);
  }

  activateUser(id) {
    return this.http.put<ResponseMessage>(this.apiUrl + 'users/activate/' +id,{}, this.httpOptions);
  }

  getFriendRequests(userId) {
    return this.http.get<FriendRequest[]>(this.apiUrl + 'users/friendRequests/' + userId, this.httpOptions);
  }

  rejectFriendRequest(userId, friendId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),

      params: new HttpParams()
        .set('userId', userId)
    };
    return this.http.put<FriendRequest[]>(this.apiUrl + 'users/rejectRequest/' + friendId,{}, httpOptions);
  }

  acceptFriendRequest(userId, friendId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),

      params: new HttpParams()
        .set('userId', userId)
    };
    return this.http.put<FriendRequest[]>(this.apiUrl + 'users/acceptRequest/' + friendId,{}, httpOptions);
  }

  getAllUsersForUser(id: string) {
    return this.http.get<User[]>(this.apiUrl + 'users/all/' +id, this.httpOptions);
  }

  addFriend(userId, friendId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),

      params: new HttpParams()
        .set('userId', userId)
    };
    return this.http.post<ResponseMessage>(this.apiUrl + 'users/addFriend/' + friendId,{}, httpOptions);

  }

  getAllUserFriends(userId) {
    return this.http.get<User[]>(this.apiUrl + 'users/friends/' +userId, this.httpOptions);
  }

  getProfilePosts(pageNo, userId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),

      params: new HttpParams()
        .set('page', pageNo)
        .set('size', "5")
        .set('userId', userId)
    };
    return this.http.get<Page>(this.apiUrl + 'posts/profile', httpOptions);
  }
}
