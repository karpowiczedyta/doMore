import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { NotificationsAllService } from '../service/notifications.service';
import { RegistrationService } from '../service/registration.service';

@Component({
  selector: 'app-genaral-account-settings',
  templateUrl: './genaral-account-settings.component.html',
  styleUrls: ['./genaral-account-settings.component.css']
})
export class GenaralAccountSettingsComponent implements OnInit {

  firstName: string = "";
  lastName: string = "";
  userName: string = "";
  user!: User;

  constructor(private serviceNotification: NotificationsAllService,
    private registration: RegistrationService,private router: Router) { }

  ngOnInit(): void {
    this.registration.getUser().subscribe(
      res => {
        this.user = res;
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.userName = res.email;
        console.log(this.user.email + this.user.password);
      }
    );
  }

  updateInformationAboutUser(){

    if(this.firstName == "" || this.lastName == "" || this.userName == ""){
      this.firstName == this.user.firstName;
      this.lastName == this.user.lastName;
      this.userName == this.user.email;
    }else{

      this.user.firstName = this.firstName;
      this.user.lastName = this.lastName;
      this.user.email = this.userName;
      this.registration.changeDataAboutUser(this.user).subscribe(
        res => {
          this.serviceNotification.onSuccess("git");
        },err => {

        }
      );
    }

  }


  logout(){
    this.registration.logout().subscribe(res => {
      console.log("logging out successfully");
      this.router.navigate(['/login']);
    },err => {
      this.serviceNotification.openSweetAlertError("Ann error has occured when while logging out");
    });
  }


}
