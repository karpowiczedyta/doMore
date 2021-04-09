import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CounterUpTimer } from '../model/counter-time-up';
import { ReviewRecord } from '../model/reviewRecord';
import { CounterUpTimerService } from '../service/counter-up-timer.service';
import { NotificationsAllService } from '../service/notifications.service';
import { RegistrationService } from '../service/registration.service';
import { ReviewRecordService } from '../service/review-record.service';

@Component({
  selector: 'app-review-records',
  templateUrl: './review-records.component.html',
  styleUrls: ['./review-records.component.css']
})
export class ReviewRecordsComponent implements OnInit {

  alleducationStagesDistinct: String[] = [];
  allNameDistinct: String[] = [];
  allYearDistinct: String[] = [];
  subjects: String[] = [];

  selectedEducationStage: any;
  selectedName: any;
  selectedYear: any;
  selectedSubject: any;

  isSelectedDate = true;
  isSelectedSubject = false;
  isSelectedStartTime = false;
  isSelectedEndTime = false;
  isSelectedSummary = false;

  date: Date | undefined;

  startTime: Time | undefined;
  endTime: Time | undefined;

  dateS: any;
  startTimeS: any;
  endTimeS: any;

  reviewRecordList: CounterUpTimer[] = [];
  timeSummary: ReviewRecord | undefined;
  timeSummarySubject: ReviewRecord | undefined;
  timeSummaryBreak: ReviewRecord | undefined;

  finalSubject: any;

  constructor(private serviceNotification: NotificationsAllService, private serviceCounterUp: CounterUpTimerService,
    private serviceReviewRecord: ReviewRecordService,private registration: RegistrationService,private router: Router) { }

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

  onchange() {
    console.log("huehueh");
    setTimeout(() => {
      console.log("endTime" + this.isSelectedEndTime);
      console.log("startTime" + this.isSelectedStartTime);
      console.log("subject" + this.isSelectedSubject);
      console.log("summary" + this.isSelectedSummary);
    }, 100);
  }

  chooseSuitableData() {
    this.dateS = this.date?.toLocaleString();
    this.startTimeS = this.startTime?.toLocaleString();
    this.endTimeS = this.endTime?.toLocaleString();

    console.log(this.dateS)
    console.log(this.startTimeS)
    console.log(this.endTimeS)
    let searchObj: ReviewRecord = {
      id: 0,
      educationStage: this.selectedEducationStage,
      name: this.selectedName,
      actualYear: this.selectedYear,
      subject: this.selectedSubject,
      date: this.dateS,
      startTime: this.startTimeS,
      endTime: this.endTimeS,
      hours: 0,
      minutes: 0,
      seconds: 0
    }

    this.finalSubject = this.selectedSubject;
    setTimeout(() => {
      if (this.isSelectedSubject === true && this.isSelectedStartTime === true && this.isSelectedEndTime === true) {
        this.serviceReviewRecord.getBySubjectAndStartTimeAndEndTime(searchObj).subscribe(
          res => {
            this.reviewRecordList = res;
            if (this.reviewRecordList.length === 0) {
              console.log("pusta");
              this.serviceNotification.openSweetAlertError("No such record was found!");
            }
          },
          err => {
            this.serviceNotification.openSweetAlertError("No such record was found!");
          }
        );
        console.log("s+start+end");
      } else if (this.isSelectedSubject === true && this.isSelectedStartTime === true) {
        this.serviceReviewRecord.getBySubjectAndStartTime(searchObj).subscribe(
          res => {
            this.reviewRecordList = res;
            if (this.reviewRecordList.length === 0) {
              console.log("pusta");
              this.serviceNotification.openSweetAlertError("No such record was found!");
            }
          },
          err => {
            this.serviceNotification.openSweetAlertError("No such record was found!");
          }
        );
        console.log("s+start");
      } else if (this.isSelectedSubject === true && this.isSelectedEndTime === true) {
        this.serviceReviewRecord.getBySubjectAndEndTime(searchObj).subscribe(
          res => {
            this.reviewRecordList = res;
            if (this.reviewRecordList.length === 0) {
              console.log("pusta");
              this.serviceNotification.openSweetAlertError("No such record was found!");
            }
          },
          err => {
            this.serviceNotification.openSweetAlertError("No such record was found!");
          }
        );
        console.log("s+end");
      } else if (this.isSelectedStartTime === true && this.isSelectedEndTime === true) {
        this.serviceReviewRecord.getByStartTimeAndEndTime(searchObj).subscribe(
          res => {
            this.reviewRecordList = res;
            if (this.reviewRecordList.length === 0) {
              console.log("pusta");
              this.serviceNotification.openSweetAlertError("No such record was found!");
            }
          },
          err => {
            this.serviceNotification.openSweetAlertError("No such record was found!");
          }
        );
        console.log("start + end")
      } else if (this.isSelectedSubject === true) {
        this.serviceReviewRecord.getBySubject(searchObj).subscribe(
          res => {
            this.reviewRecordList = res;
            if (this.reviewRecordList.length === 0) {
              console.log("pusta");
              this.serviceNotification.openSweetAlertError("No such record was found!");
            }
          },
          err => {
            this.serviceNotification.openSweetAlertError("No such record was found!");
          }
        );
        console.log("subject");
      } else if (this.isSelectedStartTime === true) {
        this.serviceReviewRecord.getByStartTime(searchObj).subscribe(
          res => {
            this.reviewRecordList = res;
            if (this.reviewRecordList.length === 0) {
              console.log("pusta");
              this.serviceNotification.openSweetAlertError("No such record was found!");
            }
          },
          err => {
            this.serviceNotification.openSweetAlertError("No such record was found!");
          }
        );
        console.log("start");
      } else if (this.isSelectedEndTime === true) {
        this.serviceReviewRecord.getByEndTime(searchObj).subscribe(
          res => {
            this.reviewRecordList = res;
            if (this.reviewRecordList.length === 0) {
              console.log("pusta");
              this.serviceNotification.openSweetAlertError("No such record was found!");
            }
          },
          err => {
            this.serviceNotification.openSweetAlertError("No such record was found!");
          }
        );
        console.log("end");
      } else {
        this.serviceReviewRecord.getByDate(searchObj).subscribe(
          res => {
            this.reviewRecordList = res;
            if (this.reviewRecordList.length === 0) {
              console.log("pusta");
              this.serviceNotification.openSweetAlertError("No such record was found!");
            }
          },
          err => {
            this.serviceNotification.openSweetAlertError("No such record was found!");
          }
        );
        console.log("post date");
      }
    }, 30);

    setTimeout(() => {

      if (this.isSelectedSummary === true && this.isSelectedSubject === true) {
        this.serviceReviewRecord.getSummaryByDay(searchObj).subscribe(
          res => {
            this.timeSummary = res;

          },
          err => {
          }
        );
        console.log("I will do summary including subject and day and DAY")
        this.serviceReviewRecord.getSummaryByDayAndSubject(searchObj).subscribe(
          res => {
            this.timeSummarySubject = res;

          },
          err => {
          }
        );
        this.serviceReviewRecord.getSummaryByDayBreak(searchObj).subscribe(
          res => {
            this.timeSummaryBreak = res;

          },
          err => {

          }
        );

      } else if (this.isSelectedSummary === true) {
        this.serviceReviewRecord.getSummaryByDay(searchObj).subscribe(
          res => {
            this.timeSummary = res;

          },
          err => {

          }
        );
        console.log("I will do summary DAY")
        this.serviceReviewRecord.getSummaryByDayBreak(searchObj).subscribe(
          res => {
            this.timeSummaryBreak = res;

          },
          err => {

          }
        );
      }

    }, 40);

  }

  displayVariables() {

    console.log(this.date?.toLocaleString());
    console.log("starttime: " + this.startTime?.toLocaleString());
    console.log(this.endTime?.toLocaleString());
    console.log(this.selectedEducationStage);
    console.log(this.selectedName);
    console.log(this.selectedYear);
    console.log(this.selectedSubject);

    this.dateS = this.date?.toLocaleString();
    this.startTimeS = this.startTime?.toLocaleString();
    this.endTimeS = this.endTime?.toLocaleString();

    console.log(this.dateS);
    console.log(this.startTimeS);
    console.log(this.endTimeS);

  }

  public getAllEducationStagesDistinct() {

    this.serviceCounterUp.getAllEducationStageDistinct().subscribe(
      res => {
        this.alleducationStagesDistinct = res;
      },
      err => {
        this.serviceNotification.openSweetAlertError("An error has occured when getting the education stages ");
      }
    );
  }

  getNameDistinctByEducationStage() {
    console.log(this.selectedEducationStage);

    let toHelp: CounterUpTimer = {
      id: 0,
      educationStage: "",
      name: "",
      actualYear: 0,
      subject: "",
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      hours: 0,
      minutes: 0,
      seconds: 0,
      educationStageHelp: this.selectedEducationStage,
      nameHelp: ""
    }

    this.serviceCounterUp.postByEducationStage(toHelp).subscribe(
      res => {
        this.allNameDistinct = res;
      },
      err => {
        this.serviceNotification.openSweetAlertError("An error has occured while getting the name connected with education stage!");
      }
    );

  }

  getYearDistinctByEducationStageAndName() {
    console.log(this.selectedName);
    let toHelp: CounterUpTimer = {
      id: 0,
      educationStage: "",
      name: "",
      actualYear: 0,
      subject: "",
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      hours: 0,
      minutes: 0,
      seconds: 0,
      educationStageHelp: this.selectedEducationStage,
      nameHelp: this.selectedName
    }

    this.serviceCounterUp.postByEducationStageAndName(toHelp).subscribe(
      res => {
        this.allYearDistinct = res;
      },
      err => {
        this.serviceNotification.openSweetAlertError("An error has occured while getting the year connected with education stage and name!");
      }
    );

  }

  getSubjectsByEducationStage() {

    console.log(this.selectedYear);

    let toHelp: CounterUpTimer = {
      id: 0,
      educationStage: this.selectedEducationStage,
      name: this.selectedName,
      actualYear: this.selectedYear,
      subject: "",
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      hours: 0,
      minutes: 0,
      seconds: 0,
      educationStageHelp: "",
      nameHelp: ""
    }

    setTimeout(() => {
      this.serviceCounterUp.postByEducationStageAndNameAndYear(toHelp).subscribe(
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
    this.selectedYear = undefined;
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
      this.getSubjectsByEducationStage();
    }
  }

  onchangeSummary() {
    console.log(this.isSelectedSummary);
    setTimeout(() => {
      console.log(this.isSelectedSummary);
      if (this.selectedEducationStage !== undefined && this.selectedName !== undefined && this.selectedYear !== undefined && this.date !== undefined && this.isSelectedSummary === true) {
        this.finalSubject = this.selectedSubject;
        this.dateS = this.date?.toLocaleString();
        this.startTimeS = this.startTime?.toLocaleString();
        this.endTimeS = this.endTime?.toLocaleString();

        let searchObj: ReviewRecord = {
          id: 0,
          educationStage: this.selectedEducationStage,
          name: this.selectedName,
          actualYear: this.selectedYear,
          subject: this.selectedSubject,
          date: this.dateS,
          startTime: this.startTimeS,
          endTime: this.endTimeS,
          hours: 0,
          minutes: 0,
          seconds: 0
        }
        setTimeout(() => {

          if (this.isSelectedSummary === true && this.isSelectedSubject === true) {
            this.serviceReviewRecord.getSummaryByDay(searchObj).subscribe(
              res => {
                this.timeSummary = res;

              },
              err => {
                this.serviceNotification.openSweetAlertError("No such record was found!");
              }
            );
            console.log("I will do summary including subject and day and DAY")
            this.serviceReviewRecord.getSummaryByDayAndSubject(searchObj).subscribe(
              res => {
                this.timeSummarySubject = res;

              },
              err => {
                this.serviceNotification.openSweetAlertError("No such record was found!");
              }
            );
            this.serviceReviewRecord.getSummaryByDayBreak(searchObj).subscribe(
              res => {
                this.timeSummaryBreak = res;

              },
              err => {
                this.serviceNotification.openSweetAlertError("No such record was found!");
              }
            );

          } else if (this.isSelectedSummary === true) {
            this.serviceReviewRecord.getSummaryByDay(searchObj).subscribe(
              res => {
                this.timeSummary = res;

              },
              err => {
                this.serviceNotification.openSweetAlertError("No such record was found!");
              }
            );
            console.log("I will do summary DAY")
            this.serviceReviewRecord.getSummaryByDayBreak(searchObj).subscribe(
              res => {
                this.timeSummaryBreak = res;

              },
              err => {
                this.serviceNotification.openSweetAlertError("No such record was found!");
              }
            );
          }

        }, 40);
      }

      if (this.isSelectedSummary === false) {
        this.timeSummary = undefined;
        this.timeSummarySubject = undefined;
        this.timeSummaryBreak = undefined;
        console.log("jestem false")
      }
    }, 100);
  }


  onchangeSubject() {
    setTimeout(() => {
      if (this.selectedEducationStage !== undefined && this.selectedName !== undefined
        && this.selectedYear !== undefined && this.date !== undefined && this.selectedSubject !== undefined
        && this.isSelectedSummary === true && this.isSelectedSubject === true) {
        console.log(this.isSelectedSummary);
        console.log(this.isSelectedSubject);
        this.finalSubject = this.selectedSubject;
        this.dateS = this.date?.toLocaleString();
        this.startTimeS = this.startTime?.toLocaleString();
        this.endTimeS = this.endTime?.toLocaleString();

        let searchObj: ReviewRecord = {
          id: 0,
          educationStage: this.selectedEducationStage,
          name: this.selectedName,
          actualYear: this.selectedYear,
          subject: this.selectedSubject,
          date: this.dateS,
          startTime: this.startTimeS,
          endTime: this.endTimeS,
          hours: 0,
          minutes: 0,
          seconds: 0
        }
        setTimeout(() => {

          if (this.isSelectedSummary === true && this.isSelectedSubject === true) {
            this.serviceReviewRecord.getSummaryByDay(searchObj).subscribe(
              res => {
                this.timeSummary = res;

              },
              err => {
                this.serviceNotification.openSweetAlertError("No such record was found!");
              }
            );
            console.log("I will do summary including subject and day and DAY")
            this.serviceReviewRecord.getSummaryByDayAndSubject(searchObj).subscribe(
              res => {
                this.timeSummarySubject = res;

              },
              err => {
                this.serviceNotification.openSweetAlertError("No such record was found!");
              }
            );
            this.serviceReviewRecord.getSummaryByDayBreak(searchObj).subscribe(
              res => {
                this.timeSummaryBreak = res;

              },
              err => {
                this.serviceNotification.openSweetAlertError("No such record was found!");
              }
            );

          } else if (this.isSelectedSummary === true) {
            this.serviceReviewRecord.getSummaryByDay(searchObj).subscribe(
              res => {
                this.timeSummary = res;

              },
              err => {
                this.serviceNotification.openSweetAlertError("No such record was found!");
              }
            );
            console.log("I will do summary DAY")
            this.serviceReviewRecord.getSummaryByDayBreak(searchObj).subscribe(
              res => {
                this.timeSummaryBreak = res;

              },
              err => {
                this.serviceNotification.openSweetAlertError("No such record was found!");
              }
            );
          }

        }, 40);
      }

      if (this.isSelectedSubject === false) {
        this.timeSummarySubject = undefined;
      }
    }, 100);

  }

}
