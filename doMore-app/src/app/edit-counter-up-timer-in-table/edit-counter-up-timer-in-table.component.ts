import { EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';
import { Component, OnInit, Injectable } from '@angular/core';
import { CounterUpTimer } from '../model/counter-time-up';
import { EducationStage } from '../model/educationStage';
import { CounterUpTimerService } from '../service/counter-up-timer.service';
import { EducationStagesAndSubjectsService } from '../service/education-stages-and-subjects.service';
import { NotificationsAllService } from '../service/notifications.service';

@Component({
  selector: 'app-edit-counter-up-timer-in-table',
  templateUrl: './edit-counter-up-timer-in-table.component.html',
  styleUrls: ['./edit-counter-up-timer-in-table.component.css']
})
export class EditCounterUpTimerInTableComponent implements OnInit {
  alleducationStagesDistinct: String[] = [];
  allNameDistinct: String[] = [];
  allYearDistinct: String[] = [];
  subjects: String[] = [];

  selectedEducationStage: any;
  selectedName: any;
  selectedYear: any;
  selectedSubject: string = "";

  objectIdGainedByEducationStageAndNameAndYear: number = 0;

  counterUpTimerList: CounterUpTimer[] = [];

  @Input('parentData')
  public id!: number;

  @Output()
  public displayPopUp = new EventEmitter();

  @Output()
  public listDataCh = new EventEmitter();

  constructor(private serviceEducationStagesAndSubjects: EducationStagesAndSubjectsService, private serviceNotification: NotificationsAllService,
    private serviceCounterUpTimer: CounterUpTimerService) { }

  ngOnInit(): void {
    this.getAllEducationStagesDistinct();
  }

  check() {
    console.log(this.selectedEducationStage);
    console.log(this.selectedName);
    console.log(this.selectedYear);
    console.log(this.selectedSubject);
    console.log(this.id);
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
        this.serviceNotification.openSweetAlertError("An error has occured while getting the education stage, which has to be connected with adding an subject! Check the correctness of the data selected in dropdown lists above!");

      }
    );
  }

  getSubjectsByEducationStage() {
    this.getObjectByEducationStageAndNameAndActualYear();

    setTimeout(() => {
      this.serviceEducationStagesAndSubjects.getSubjectsByEducationStageSubjectDistinct(this.objectIdGainedByEducationStageAndNameAndYear).subscribe(
        res => {
          this.subjects = res;
        },
        err => {
          this.serviceNotification.openSweetAlertError("An error has occured while getting the subjects.");
        }
      );
    }, 30);

  }

  getEducationStage() {
    this.allNameDistinct = [];
    this.allYearDistinct = [];
    this.subjects = [];
    console.log("educationstage" + this.selectedEducationStage);
    this.getNameDistinctByEducationStage();
  }

  getName() {
    this.allYearDistinct = [];
    this.subjects = [];
    console.log("name" + this.selectedName);
    this.getYearDistinctByEducationStageAndName();
  }

  getYear() {
    this.subjects = [];
    console.log(this.selectedYear);
    if (this.selectedYear !== undefined) {
      this.getSubject();
    }
  }

  getSubject() {
    this.getSubjectsByEducationStage();
  }

  onClose() {
    this.displayPopUp.emit('false');
    location.reload();
  }

  update() {
    let toUpdate: CounterUpTimer = {
      id: this.id,
      educationStage: this.selectedEducationStage,
      name: this.selectedName,
      actualYear: this.selectedYear,
      subject: this.selectedSubject,
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      hours: 0,
      minutes: 0,
      seconds: 0,
      educationStageHelp: "",
      nameHelp: ""
    }
    this.serviceCounterUpTimer.patchCounterUpTimer(toUpdate).subscribe(
      res => {
        this.displayPopUp.emit('false');
        this.listDataCh.emit('updated!');
        location.reload();
      },
      err => {
        this.serviceNotification.openSweetAlertError("An error has occured while updating the counter-up-timer! ");

      }
    );
  }

}
