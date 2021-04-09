import { EducationStage } from './../model/educationStage';
import { Component, OnInit } from '@angular/core';
import { EducationStagesAndSubjectsService } from '../service/education-stages-and-subjects.service';
import { NotificationsAllService } from '../service/notifications.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RegistrationService } from '../service/registration.service';

@Component({
  selector: 'app-edit-remove-education-stage',
  templateUrl: './edit-remove-education-stage.component.html',
  styleUrls: ['./edit-remove-education-stage.component.css']
})
export class EditRemoveEducationStageComponent implements OnInit {

  allEducationStages: EducationStage[] = [];

  constructor(private service: EducationStagesAndSubjectsService, private serviceNotification: NotificationsAllService,
    private registration: RegistrationService,private router: Router) { }

  ngOnInit(): void {
    this.getAllEducationStages();
  }

  logout(){
    this.registration.logout().subscribe(res => {
      console.log("logging out successfully");
      this.router.navigate(['/login']);
    },err => {
      this.serviceNotification.openSweetAlertError("Ann error has occured when while logging out");
    });
  }

  public getAllEducationStages(): void {

    this.service.getAllEducationStages().subscribe(
      res => {
        this.allEducationStages = res;
      },
      err => {
        this.serviceNotification.openSweetAlertError("An error has occured when getting the education stages ");
      }
    );
  }

  public deleteEducationStage(educationStage: EducationStage) {
    Swal.fire({
      title: 'Are you sure that you want to delete education stage?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.service.deleteEducationStage(educationStage.id).subscribe(
          res => {
            let indexOfEducationStage = this.allEducationStages.indexOf(educationStage);
            this.allEducationStages.splice(indexOfEducationStage, 1);
          },
          err => {
            this.serviceNotification.openSweetAlertError("Could not delete education stage!");
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }

  public updateEducationStage(educationStage: EducationStage) {
    this.service.patchEducationStage(educationStage).subscribe(
      res => {
        this.serviceNotification.onSuccess("Successfully updated!");
        console.log("updated");
      },
      err => {
        this.serviceNotification.openSweetAlertError("An error has occured while updating the education stage! ")
      }
    );
  }

}
