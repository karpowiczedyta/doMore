import { Subject } from './../model/subject';
import { Component, OnInit } from '@angular/core';
import { EducationStage } from '../model/educationStage';
import { EducationStagesAndSubjectsService } from '../service/education-stages-and-subjects.service';
import { NotificationsAllService } from '../service/notifications.service';
import Swal from 'sweetalert2';
import { RegistrationService } from '../service/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-remove-subject',
  templateUrl: './edit-remove-subject.component.html',
  styleUrls: ['./edit-remove-subject.component.css']
})
export class EditRemoveSubjectComponent implements OnInit {

  alleducationStagesDistinct: String[] = [];
  allNameDistinct: String[] = [];
  allYearDistinct: String[] = [];
  subjects: Subject[] = [];

  selectedEducationStage: any;
  selectedName: any;
  selectedYear: any;

  objectIdGainedByEducationStageAndNameAndYear: number = 0;

  constructor(private serviceEducationStagesAndSubjects: EducationStagesAndSubjectsService,
     private serviceNotification: NotificationsAllService,private registration: RegistrationService,private router: Router) { }

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
        this.serviceNotification.openSweetAlertError("An error has occured when getting the education stages ");
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
        this.serviceNotification.openSweetAlertError("An error has occured while getting the name connected with education stage");

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
        this.serviceNotification.openSweetAlertError("An error has occured while getting the year connected with education stage and name");
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
        console.log(this.objectIdGainedByEducationStageAndNameAndYear);
      },
      err => {
        this.serviceNotification.openSweetAlertError("An error has occured while getting the education stage which has to be connected with adding an subject! Check the correctness of the data selected in dropdown lists above!");
      }
    );
  }


  getSubjectsByEducationStage() {
    this.getObjectByEducationStageAndNameAndActualYear();

    setTimeout(() => {
      this.serviceEducationStagesAndSubjects.getSubjectsByEducationStage(this.objectIdGainedByEducationStageAndNameAndYear).subscribe(
        res => {
          this.subjects = res;
        },
        err => {
          this.serviceNotification.openSweetAlertError("An error has occured while getting the subjects.");
        }
      );
    }, 30);

    setTimeout(() => {
      if (this.selectedEducationStage === undefined || this.selectedName === undefined || this.selectedYear === undefined) {
        this.serviceNotification.openSweetAlertWarning("Check the correctness of the selected data in the drop-down above. Fields cannot be empty! Choose the right options!");
      } else if (this.subjects.length === 0) {
        this.serviceNotification.openSweetAlertWarning("You do not have any subject assigned to this stage of education!");
      }
    }, 60);
  }

  deleteSubject(subject: Subject) {
    Swal.fire({
      title: 'Are you sure that you want to delete subject?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.serviceEducationStagesAndSubjects.deleteSubject(subject.id).subscribe(
          res => {
            let indexOfNotebook = this.subjects.indexOf(subject);
            this.subjects.splice(indexOfNotebook, 1);
          },
          err => {
            this.serviceNotification.openSweetAlertError("Could not delete this subject!");
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }

  updateSubject(subject: Subject) {
    this.serviceEducationStagesAndSubjects.patchSubject(subject).subscribe(
      res => {
        this.serviceNotification.onSuccess("Successfully updated!");
      },
      err => {
        this.serviceNotification.openSweetAlertError("An error has occured while updating the subject! ");
      }
    );
  }

}
