import { EducationStage } from './../model/educationStage';
import { Component, OnInit } from '@angular/core';
import { EducationStagesAndSubjectsService } from '../service/education-stages-and-subjects.service';
import { Subject } from '../model/subject';
import { NotificationsAllService } from '../service/notifications.service';
import { RegistrationService } from '../service/registration.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  alleducationStagesDistinct: String[] = [];
  allNameDistinct: String[] = [];
  allYearDistinct: String[] = [];

  selectedEducationStage: any;
  selectedName: any;
  selectedYear: any;

  objectIdGainedByEducationStageAndNameAndYear: number = 0;

  newSubject: string = "";

  constructor(private serviceEducationStagesAndSubjects: EducationStagesAndSubjectsService,
     private serviceNotification: NotificationsAllService, private registration: RegistrationService,private router: Router) { }

  ngOnInit(): void {
    this.getAllEducationStagesDistinct();
  }

  logout(){
    this.registration.logout().subscribe(res => {
      console.log("logging out successfully");
      this.router.navigate(['/login']);
    },err => {
      this.serviceNotification.openSweetAlertError("Ann error has occured when while logging out");
    });
  }

  public getAllEducationStagesDistinct() {

    this.serviceEducationStagesAndSubjects.getAllEducationStageDistinct().subscribe(
      res => {
        this.alleducationStagesDistinct = res;
      },
      err => {
        this.serviceNotification.openSweetAlertError("An error has occured when getting the education stages!");
      }
    );
  }

  getNameDistinctByEducationStage() {

    let toHelp: EducationStage = {
      id: 0,
      educationStage: "",
      name: "",
      actualYear: 0,
      nbSubjects: 0,
      educationStageHelp: this.selectedEducationStage,
      nameHelp: ""
    }

    this.serviceEducationStagesAndSubjects.postByEducationStage(toHelp).subscribe(
      res => {
        this.allNameDistinct = res;
      },
      err => {
        this.serviceNotification.openSweetAlertError("An error has occured while getting the name connected with education stage!");
      }
    );

  }

  getYearDistinctByEducationStageAndName() {

    let toHelp: EducationStage = {
      id: 0,
      educationStage: "",
      name: "",
      actualYear: 0,
      nbSubjects: 0,
      educationStageHelp: this.selectedEducationStage,
      nameHelp: this.selectedName
    }

    this.serviceEducationStagesAndSubjects.postByEducationStageAndName(toHelp).subscribe(
      res => {
        this.allYearDistinct = res;
      },
      err => {
        this.serviceNotification.openSweetAlertError("An error has occured while getting the year connected with education stage and name!");

      }
    );

  }

  getEducationStage() {
    this.allNameDistinct = [];
    this.allYearDistinct = [];
    console.log(this.selectedEducationStage);
    this.getNameDistinctByEducationStage();

  }

  getName() {
    console.log(this.selectedName);
    this.getYearDistinctByEducationStageAndName();
  }

  getYear() {
    console.log(this.selectedYear);
  }

  getObjectByEducationStageAndNameAndActualYear() {
    let toHelp: EducationStage = {
      id: 0,
      educationStage: this.selectedEducationStage,
      name: this.selectedName,
      actualYear: this.selectedYear,
      nbSubjects: 0,
      educationStageHelp: "",
      nameHelp: ""
    }

    this.serviceEducationStagesAndSubjects.postByEducationStageAndNameAndYear(toHelp).subscribe(
      res => {
        this.objectIdGainedByEducationStageAndNameAndYear = res.id;

      },
      err => {
        this.serviceNotification.openSweetAlertError("An error has occured while getting the education stage which has to be connected with adding an subject! Check the correctness of the data selected in dropdown lists above!");

      }
    );
  }

  addSubject(): void {

    this.getObjectByEducationStageAndNameAndActualYear();

    setTimeout(() => {
      let newSubject: Subject = {
        id: 0,
        subjectName: this.newSubject,
        educationStageId: this.objectIdGainedByEducationStageAndNameAndYear
      }

      this.serviceEducationStagesAndSubjects.postSubject(newSubject).subscribe(
        res => {
          location.reload();
        },
        err => {
          this.serviceNotification.openSweetAlertError("An error has occurred while sending subject. Check the correctness of the selected data in the drop-down above. Fields cannot be empty! Choose the right option! ");
        }
      );
    }, 30);

  }
}
