import { Router } from '@angular/router';
import { RegistrationService } from './../service/registration.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msg: string = "";

   user: User = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    error: ""
  }

  constructor(private service: RegistrationService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(){
       console.log(this.user.email);
    console.log(this.user.password);

      this.service.loginUserFromRemote(this.user).subscribe(
        res => {
          console.log("response recived");
          this.router.navigate(['/startLearning']);
        },
        err => {
          console.log("An error has occured");
          this.msg="Bad credentials, please enter valid email and password"
        }
      );
  }

}
