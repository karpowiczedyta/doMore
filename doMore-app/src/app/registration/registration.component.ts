import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { RegistrationService } from '../service/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  msg: string = "";
  msgD: string = "";
  firstNamee: string = "";
  lastNamee: string = "";
  emaill: string = "";
  passwordd: string = "";

  allUsers: User[] = [];

  constructor(private service: RegistrationService, private router: Router) { }

  ngOnInit(): void {

  }

  public getAllUsers(user: User) {

    this.service.ifExistsUsers(user).subscribe(
      res => {
        this.msgD = res.error;
      },
      err => {
      }
    );
  }

  registerUser(){

    this.msg = "";
    this.msgD = "";

    let user: User = {
      id: 0,
      firstName: this.firstNamee,
      lastName: this.lastNamee,
      email: this.emaill,
      password: this.passwordd,
      error: ""
    }

    console.log(user.email);
    console.log(user.password);

      this.service.registerUserFromRemote(user).subscribe(
        res => {
          this.msg = "";
          this.firstNamee = "";
          this.lastNamee = "";
          this.emaill = "";
          this.passwordd = "";
          console.log("response recived");
          this.router.navigate(['/login']);
        },
        err => {
          console.log(this.msgD);
          this.msg="This username is already in use"
        }
      );
    }
}
