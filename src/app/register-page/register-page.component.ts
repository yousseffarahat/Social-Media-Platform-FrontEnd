import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RestApiService} from "../services/rest-api.service";
import {UserRequest} from "../models/UserRequest";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  registerForm = this.formBuilder.group({
    firstName: ['',[Validators.required,Validators.max(20)]],
    lastName: ['',[Validators.required,Validators.max(20)]],
    username: ['',[Validators.required,Validators.max(20)]],
    password: ['',[Validators.required,Validators.min(6)]]
  })
  userNameAvailable = false;
  constructor(private formBuilder: FormBuilder, private apiService: RestApiService,
              private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.getValidated()=="true"){
      console.log(this.authService.getValidated())
      this.router.navigate(['/timeline']);
    }
  }

  onSubmit() {
    if(this.registerForm.valid){
      const request = new UserRequest(this.registerForm.value.firstName,this.registerForm.value.lastName,
                                       this.registerForm.value.username,this.registerForm.value.password);
      this.apiService.registerUser(request).subscribe(data =>{
        this.authService.setValidated();
        this.authService.setToken(data.message)
        this.router.navigate(['/timeline']);
      },error =>{
        console.log(error);
      })
    }
  }

  resetAvailability() {
    this.userNameAvailable = false;
  }

  checkUsernameAvailability() {
    this.apiService.checkUsername(this.registerForm.value.username).subscribe(data =>{
      if(data == true){
        this.userNameAvailable = true;
      }else{
        this.userNameAvailable = false;
        this.registerForm.controls['username'].setErrors({'incorrect': true});
      }
    },error => {
      console.log(error);
    })
  }
}
