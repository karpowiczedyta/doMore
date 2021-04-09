import { RegistrationService } from './../service/registration.service';
import { Component, OnInit } from '@angular/core';
import { EducationStage } from '../model/educationStage';
import { EducationStagesAndSubjectsService } from '../service/education-stages-and-subjects.service';
import { NotificationsAllService } from '../service/notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-education-stage',
  templateUrl: './add-education-stage.component.html',
  styleUrls: ['./add-education-stage.component.css']
})
export class AddEducationStageComponent implements OnInit {

  newEducationStage: EducationStage = {
    id: 0,
    educationStage: "",
    name: "",
    actualYear: 0,
    nbSubjects: 0,
    educationStageHelp: "",
    nameHelp: ""
  }

  constructor(private serviceEStageAndSubject: EducationStagesAndSubjectsService,private serviceNotification: NotificationsAllService,
    private registration: RegistrationService,private router: Router ) { }

  ngOnInit(): void {
  }

  sendEducationStage(): void {

    this.serviceEStageAndSubject.postEducationStage(this.newEducationStage).subscribe(
      res => {
        location.reload();
      },
      err => {
        this.serviceNotification.openSweetAlertError("An error has occurred while sending education stage. You cannot add the same stage of education!");
      }
    );

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
