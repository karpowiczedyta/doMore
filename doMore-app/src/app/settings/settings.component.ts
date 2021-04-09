import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { NotificationsAllService } from '../service/notifications.service';
import { RegistrationService } from '../service/registration.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private registration: RegistrationService, private router: Router, private serviceNotification: NotificationsAllService) { }

  user!: User;
  currenPassword: string = "";
  passwordd: string = "";
  passwordConfirm: string = "";
  enteredPassword: boolean = false;
  firstName: string = "";
  lastName: string = ""
  differentPassword: boolean = false;
  msg: string = "";
  msgDiffrent: string = "";
  msgNew: string = "";
  msgSixCharacters: string = "";
  msgConirm: string = "";
  msgSuccessful: string = "";

  ngOnInit(): void {
    this.registration.getUser().subscribe(
      res => {
        this.user = res;
        console.log(this.user.email + this.user.password);
      }
    );
  }

  logout() {
    this.registration.logout().subscribe(res => {
      console.log("logging out successfully");
      this.router.navigate(['/login']);
    }, err => {
      this.serviceNotification.openSweetAlertError("Ann error has occured when while logging out");
    });
  }

  changePassword() {
    this.user.password = this.currenPassword;
    console.log(this.user.password);

    this.registration.checkUserCredentils(this.user).subscribe(
      res => {
        this.msg = ""
        console.log("jest git hasło!")
        if (this.passwordd.length < 6 && this.passwordd.length != 0) {
          this.msgNew = "";
          this.msgDiffrent = "";
          this.msgSixCharacters = "The password must not be shorter that 6 characters";
        } else if (this.passwordd == "") {
          this.msgSixCharacters = "";
          this.msgDiffrent = "";
          this.msgNew = "The password must not be empty!"
          console.log("empty")
        }
        else if (this.passwordd !== this.passwordConfirm) {
          this.msgDiffrent = "To confirm the password, enter the same password twice. "
          this.msgNew = "";
          this.msgSixCharacters = "";
          console.log("hasła są rozne");
        } else {
          console.log("I am starting change password!")
          this.msgDiffrent = "";
          this.msgNew = "";
          this.msgSixCharacters = "";

          if (this.passwordd === this.user.password) {
            this.msgNew = "You entered old password!";
            this.msgSixCharacters = "";
            this.msgDiffrent = "";
          } else {
            this.user.password = this.passwordd;
            this.registration.changePassword(this.user).subscribe(
              res => {
                this.msg = "";
                this.msgConirm = "";
                this.msgDiffrent = "";
                this.msgSixCharacters = "";
                this.msgNew = "";
                this.passwordd = "";
                this.passwordConfirm = "";
                this.currenPassword = "";
                this.msgSuccessful = "Password has been changed successfully!";
                setTimeout(() => {
                  this.router.navigate(['/settings']);
                }, 2000);
              }, err => {
                this.msgSuccessful = "An error has occured while changing the password!";
              }
            );
          }

        }
      }, err => {
        this.msg = "";
        this.msgConirm = "";
        this.msgDiffrent = "";
        this.msgSixCharacters = "";
        this.msgNew = "";
        this.msg = "Please enter valid password!"
      }
    );
  }

}
