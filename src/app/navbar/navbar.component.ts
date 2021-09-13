import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {User} from "../models/User";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;

  constructor(public authService: AuthenticationService, private router:Router) {
    if(this.authService.getUserDetailsFromToken()){
      // @ts-ignore
      this.user = this.authService.getUserDetailsFromToken().user;
    }
  }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.setValidatedFalse();
    this.authService.setToken('');
    this.user = null;
    this.router.navigate(['/login']);
  }

  isValidated() {
    return this.authService.getValidated() == 'true';
  }
}
