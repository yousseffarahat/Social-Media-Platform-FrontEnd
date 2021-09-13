import {Injectable} from '@angular/core';
import jwt_decode from 'jwt-decode';
import {User} from "../models/User";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  validated = false;

  constructor() {
  }

  setValidated() {
    this.validated = true;
    localStorage.setItem('validated', "true");
  }

  public getValidated() {
    return localStorage.getItem('validated');
  }

  setValidatedFalse() {
    this.validated = false;
    localStorage.setItem('validated', "false");
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getUserDetailsFromToken(){
      try{
        return jwt_decode(localStorage.getItem('token'));
      }
      catch(Error){
        return null;
      }
  }

  getAdmin() {
    if(localStorage.getItem("token") && localStorage.getItem("token")!==''){
      // @ts-ignore
      return this.getUserDetailsFromToken().user.admin;
    }else{
      return false;
    }
  }
}
