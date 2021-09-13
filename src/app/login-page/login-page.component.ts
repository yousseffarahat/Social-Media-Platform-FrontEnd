import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {RestApiService} from "../services/rest-api.service";
import {LoginRequest} from "../models/loginRequest";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm = this.formBuilder.group({
    username: ['',[Validators.required]],
    password: ['',[Validators.required,Validators.min(6)]]
  })
  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService,
              private router: Router, private apiService: RestApiService, private _snackBar: MatSnackBar) { }


  ngOnInit(): void {
    if(this.authService.getValidated()=="true"){
      this.router.navigate(['/timeline']);
    }
  }

  onSubmit() {
    if(this.loginForm.valid){
      const request = new LoginRequest(this.loginForm.value.username, this.loginForm.value.password);
      this.apiService.login(request).subscribe(data=>{
        this.authService.setValidated();
        this.router.navigate(['/timeline']);
        this.authService.setToken(data.message)
      },error=>{
        console.log(error)
        this.openSnackBar("Wrong Credentials, Please Try Again","Dismiss")

      })
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 2000
    });
  }
}
