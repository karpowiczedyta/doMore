
import { Component, OnInit, ViewChild } from '@angular/core';
import { CdTimerComponent } from 'angular-cd-timer';
import { NotificationsAllService } from '../service/notifications.service';
import { CounterUpTimer } from '../model/counter-time-up';
import { EducationStage } from '../model/educationStage';
import { CounterUpTimerService } from '../service/counter-up-timer.service';
import { EducationStagesAndSubjectsService } from '../service/education-stages-and-subjects.service';
import Swal from 'sweetalert2';
import { Break } from '../model/break';
import { Router } from '@angular/router';
import { RegistrationService } from '../service/registration.service';

@Component({
  selector: 'app-counter-up-timmer',
  templateUrl: './counter-up-timmer.component.html',
  styleUrls: ['./counter-up-timmer.component.css']
})

export class CounterUpTimmerComponent implements OnInit {

  alleducationStagesDistinct: String[] = [];
  allNameDistinct: String[] = [];
  allYearDistinct: String[] = [];
  subjects: String[] = [];

  selectedEducationStage: any;
  selectedName: any;
  selectedYear: any;
  selectedSubject: string = "";

  objectIdGainedByEducationStageAndNameAndYear: number = 0;

  counterUpTimerArray: CounterUpTimer[] = [];
  breakObject: Break = {
    id: 0,
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  isDisableAdd: boolean = true;
  isDisabledCounterUp: boolean = false;
  isDisabledBreak: boolean = false;

  isDisabledPlayBreak: boolean = false;
  isDisabledStopBreak: boolean = true;
  isCounting: number = 0;

  logout(){
    this.registration.logout().subscribe(res => {
      console.log("logging out successfully");
      this.router.navigate(['/login']);
    },err => {
      this.serviceNotification.openSweetAlertError("Ann error has occured when while logging out");
    });
  }

  truee(i: number) {

    if (this.isCounting === 1) {
      this.isDisabledCounterUp = true;
      this.isDisabledBreak = true;
      this.isDisabledBreak = true;
      return true;
    } else if (this.counterUpTimerArray.length - 1 === i) {
      this.isDisabledCounterUp = false;
      return true;
    } else {
      this.isDisabledCounterUp = true;
      return true;
    }
  }
  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;
  days: number = 0;

  @ViewChild('basicTimer')
  time!: CdTimerComponent;

  option: boolean = false;

  constructor(private serviceEducationStagesAndSubjects: EducationStagesAndSubjectsService, private serviceCounterUp: CounterUpTimerService,
    private serviceNotification: NotificationsAllService,private registration: RegistrationService,private router: Router) {
  }

  ngOnInit(): void {
    this.getAllEducationStagesDistinct();
  }

  resume(updateRecord: CounterUpTimer) {
    this.time.resume();
    this.isDisabledPlayBreak = true;
  }

  start1() {
    this.time.start();
    this.seconds = this.time.get().seconds;
    console.log(this.seconds);
    this.minutes = this.time.get().minutes;
    console.log(this.minutes);
    this.hours = this.time.get().hours;
    console.log(this.hours);
    this.time.start();
  }

  stop1() {
    this.time.stop();
  }

  startBreak() {
    this.time.start();
    setTimeout(() => {
      this.seconds = this.time.get().seconds;
      console.log(this.seconds);
      this.minutes = this.time.get().minutes;
      console.log(this.minutes);
      this.hours = this.time.get().hours;
      console.log(this.hours);
    }, 2000);

    setTimeout(() => {
      this.breakObject = {
        id: 0,
        date: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        hours: 0,
        minutes: 0,
        seconds: 0
      }

      this.isDisabledStopBreak = false;
      this.isDisabledPlayBreak = true;
      this.isCounting = 1;
    }, 2000);


  }

  stopBreak() {

    this.time.stop();
    setTimeout(() => {
      this.breakObject.endTime = new Date();
      this.breakObject.seconds = this.time.get().seconds;
      console.log(this.seconds);
      this.breakObject.minutes = this.time.get().minutes;
      console.log(this.minutes);
      this.breakObject.hours = this.time.get().hours;
      console.log(this.hours);
    }, 10);

    setTimeout(() => {
      this.serviceCounterUp.postBreak(this.breakObject).subscribe(
        res => {

          this.serviceNotification.onSuccess("Your time measurement intended for a break has been successfully added!");
          this.isDisabledStopBreak = true;
          this.isDisabledPlayBreak = false;
          this.isDisabledCounterUp = false;
          this.isDisabledBreak = false;
          this.isCounting = 0;

        },
        err => {
          this.serviceNotification.openSweetAlertError("An error has occured while saving your break");
        }
      );
    }, 30);

  }

  start(updateRecord: CounterUpTimer): void {
    this.time.start();
    setTimeout(() => {
      this.seconds = this.time.get().seconds;
      console.log(this.seconds);
      this.minutes = this.time.get().minutes;
      console.log(this.minutes);
      this.hours = this.time.get().hours;
      console.log(this.hours);
      this.isDisabledPlayBreak = true;
      this.isDisabledStopBreak = true;
    }, 2000);

    this.counterUpTimerArray.filter(res => {
      if (res === updateRecord) {
        res.startTime = new Date();
        console.log(res.date);
      }
    }
    );
  }

  stop(updateRecord: CounterUpTimer): void {
    this.isDisabledPlayBreak = false;
    this.counterUpTimerArray.filter(res => {
      if (res === updateRecord) {
        res.endTime = new Date();
        console.log(res.date);
      }
    }
    );

    this.time.stop();
    this.seconds = this.time.get().seconds;
    console.log(this.seconds);
    this.minutes = this.time.get().minutes;
    console.log(this.minutes);
    this.hours = this.time.get().hours;
    console.log(this.hours);

    this.counterUpTimerArray.filter(res => {
      if (res === updateRecord) {
        if (this.seconds !== 0 || this.minutes !== 0 || this.hours !== 0) {
          res.seconds = this.time.get().seconds;
          res.minutes = this.time.get().minutes;
          res.hours = this.time.get().hours;
        }
      }
    }
    );
  }

  addRecord() {

    let dateString = '1968-11-16T01:00:00'
    let newDate = new Date(dateString);
    let newDateNew = newDate.toTimeString();
    console.log(newDateNew);
    console.log(newDate.toLocaleDateString);

    let newRecord: CounterUpTimer = {
      id: 0,
      educationStage: this.selectedEducationStage,
      name: this.selectedName,
      actualYear: this.selectedYear,
      subject: this.selectedSubject,
      date: new Date(),
      startTime: newDate,
      endTime: newDate,
      hours: 0,
      minutes: 0,
      seconds: 0,
      educationStageHelp: "",
      nameHelp: ""
    }

    let tmp: number = 0;

    if (this.counterUpTimerArray.length === 0) {
      setTimeout(() => {
        this.counterUpTimerArray.push(newRecord);
      }, 10);
    }

    if (this.isDisabledPlayBreak === true) {
      Swal.fire({
        title: 'Are you sure that you want to add new record? You have not finished your break! You want to save it?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, add it!',
        cancelButtonText: 'Do not add it!'
      }).then((result) => {
        if (result.value) {
          this.time.stop();
          setTimeout(() => {
            this.breakObject.endTime = new Date();
            this.breakObject.seconds = this.time.get().seconds;
            console.log(this.seconds);
            this.breakObject.minutes = this.time.get().minutes;
            console.log(this.minutes);
            this.breakObject.hours = this.time.get().hours;
            console.log(this.hours);
          }, 10);

          setTimeout(() => {
            this.serviceCounterUp.postBreak(this.breakObject).subscribe(
              res => {

                this.serviceNotification.onSuccess("Your time measurement intended for a break has been successfully added!");
                this.time.reset();
                this.isDisabledStopBreak = true;
                this.isDisabledPlayBreak = false;
                this.isDisabledCounterUp = false;
                this.isDisabledBreak = false;
                this.isCounting = 0;

              },
              err => {
                this.serviceNotification.openSweetAlertError("An error has occured while saving your break");
              }
            );
          }, 30);

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.time.reset();
          this.isDisabledPlayBreak = false;
          this.isDisabledStopBreak = true;
          this.isCounting = 0;
        }
      })

    }

    if (this.counterUpTimerArray.length !== 0) {

      if (this.counterUpTimerArray[this.counterUpTimerArray.length - 1].startTime.toTimeString() === newDateNew && this.counterUpTimerArray[this.counterUpTimerArray.length - 1].endTime.toTimeString() === newDateNew) {

        this.serviceNotification.openSweetAlertError("You cannot add a new subject to start counting the time, which you want to spend on it, because you have not started and finished the previous one. Start and finish counting the time, which you intend to spend on a previously added subject, or remove it from your record list.")

      }
      else if (this.counterUpTimerArray[this.counterUpTimerArray.length - 1].startTime.toTimeString() === newDateNew) {

        this.serviceNotification.openSweetAlertError("You cannot add a new subject to start counting the time, which you want to spend on it, because you have not started the previous one. Start counting the time, which you intend to spend on a previously added subject, or remove it from your record list. ")


      } else if (this.counterUpTimerArray[this.counterUpTimerArray.length - 1].endTime.toTimeString() === newDateNew) {

        this.serviceNotification.openSweetAlertError("You cannot add a new subject to start counting the time, which you want to spend on it, because you have not finished the previous one. Finish counting the time, which you intend to spend on a previously added subject, or remove it from your record list.")

      } else {
        this.counterUpTimerArray.push(newRecord);
        this.time.reset();
      }
    }
  }

  delete(counterUpTimer: CounterUpTimer) {
    Swal.fire({
      title: 'Are you sure that you want to delete this record from your list?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        let indexOfCounterUpTimer = this.counterUpTimerArray.indexOf(counterUpTimer);
        this.counterUpTimerArray.splice(indexOfCounterUpTimer, 1);
        this.time.reset();
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })

  }

  removeAll() {

    Swal.fire({
      title: 'Are you sure that you want to delete all records from your list?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.counterUpTimerArray = [];
        this.time.reset();
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })

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
    this.subjects = [];
    console.log("educationstage" + this.selectedEducationStage);
    this.getNameDistinctByEducationStage();
    this.isDisableAdd = true;
    this.selectedYear = undefined;
  }

  getName() {
    this.allYearDistinct = [];
    this.subjects = [];
    console.log("name" + this.selectedName);
    this.getYearDistinctByEducationStageAndName();
    this.isDisableAdd = true;
    this.selectedYear = undefined;
  }

  getYear() {
    this.subjects = [];
    this.isDisableAdd = true;
    console.log(this.selectedYear);
    if (this.selectedYear !== undefined) {
      this.getSubject();
    }
  }

  getSubject() {
    this.getSubjectsByEducationStage();
  }

  checkItOut() {
    setTimeout(() => {

      if (this.selectedSubject.length === 0) {
      }

      else if (this.selectedEducationStage === undefined || this.selectedName === undefined || this.selectedYear === undefined) {
        this.serviceNotification.openSweetAlertError("In order to be able to start counting the time, you must select the appropriate data in the drop-down lists at the top. Fields cannot be empty!");
      } else {
        this.isDisableAdd = false;
      }
    }, 10);
  }

  chooseSubject() {
    console.log(this.selectedSubject);
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

  post(counterUpTimer: CounterUpTimer) {

    let dateString = '1968-11-16T01:00:00'
    let newDate = new Date(dateString);
    let newDateNew = newDate.toTimeString();
    let tmpStart: string = counterUpTimer.startTime.toTimeString();
    let tmpEnd: string = counterUpTimer.endTime.toTimeString();
    let seconds = counterUpTimer.seconds;
    let minutes = counterUpTimer.minutes;
    let hours = counterUpTimer.hours;

    console.log(dateString);
    console.log("time: " + tmpStart);
    console.log(newDate);
    console.log("time: " + newDateNew);

    if (tmpStart === newDateNew && tmpEnd === newDateNew) {
      this.serviceNotification.openSweetAlertError("You cannot add this time measurement, because you have not started and finished counting the time, which you intend to spend on this subject! ")
    }
    else if (tmpStart === newDateNew) {
      this.serviceNotification.openSweetAlertError("You cannot add this time measurement, because you have not started counting the time, which you intend to spend on this subject! ")
    } else if (tmpEnd === newDateNew) {
      this.serviceNotification.openSweetAlertError("You cannot add this time measurement, because you have not finished counting the time, which you intend to spend on this subject! ")
    } else if (seconds === 0 && minutes === 0 && hours === 0) {
      this.serviceNotification.openSweetAlertError("Your time, which you spent on this subject is 00:00:00, please check the correctness of your data. ");
    }
    else {

      this.serviceCounterUp.postCounterUpTimer(counterUpTimer).subscribe(
        res => {
          let indexOfCounterUpTimer = this.counterUpTimerArray.indexOf(counterUpTimer);
          this.counterUpTimerArray.splice(indexOfCounterUpTimer, 1);
          this.serviceNotification.onSuccess("Your time measurement intended for a learning has been successfully added!");
          this.time.reset();

        },
        err => {
          this.serviceNotification.openSweetAlertError("An error has occured while saving your counter-up timer");
        }
      );

    }

  }

}








