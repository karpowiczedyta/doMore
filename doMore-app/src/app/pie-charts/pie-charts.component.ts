import { PieChart } from './../model/pieChart';
import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Charts } from '../model/charts';
import { CounterUpTimer } from '../model/counter-time-up';
import { ChartsService } from '../service/charts.service';
import { CounterUpTimerService } from '../service/counter-up-timer.service';
import { NotificationsAllService } from '../service/notifications.service';
import { Router } from '@angular/router';
import { RegistrationService } from '../service/registration.service';

@Component({
  selector: 'app-pie-charts',
  templateUrl: './pie-charts.component.html',
  styleUrls: ['./pie-charts.component.css']
})
export class PieChartsComponent implements OnInit {

  alleducationStagesDistinct: String[] = [];
  allNameDistinct: String[] = [];
  allYearDistinct: String[] = [];

  selectedEducationStage: any;
  selectedName: any;
  selectedYear: any;

  date: string = "";
  dateS: string = "";

  isDisalbed: boolean = true;

  isDate: boolean = false;
  isWeek: boolean = false;
  isMonth: boolean = false;
  isYear: boolean = false;

  howManyTimesDay: number = 0;
  howManyTimesWeek: number = 0;
  howManyTimesMonth: number = 0;
  howManyTimesYear: number = 0;

  hours: number[] = [];
  subjects: string[] = [];

  public pieChartType: ChartType = 'pie';
  public pieChartData = [
    { data: [100] },
  ];
  public pieChartLabels = ['No date'];

  public pieChartOptions: ChartOptions = {
    legend: {
      position: 'right',

    }
  };

  newDate: String = "";

  constructor(private serviceNotification: NotificationsAllService, private serviceCounterUp: CounterUpTimerService
    , private chartService: ChartsService,private registration: RegistrationService,private router: Router) { }

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
      this.serviceCounterUp.postByEducationStageAndNameAndYearSM(toHelp).subscribe(
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
    this.isDisalbed = true;
    this.allNameDistinct = [];
    this.allYearDistinct = [];
    console.log("educationstage" + this.selectedEducationStage);
    this.getNameDistinctByEducationStage();
    this.selectedYear = undefined;
  }


  getName() {
    this.isDisalbed = true;
    this.allYearDistinct = [];
    console.log("name" + this.selectedName);
    this.getYearDistinctByEducationStageAndName();
  }

  getYear() {
    if (this.selectedEducationStage !== undefined && this.selectedName !== undefined && this.selectedYear !== undefined) {
      this.isDisalbed = false;
    }
    console.log(this.selectedYear);
  }

  getDateByDay(dateToSearch: Charts) {
    this.chartService.getDateByDay(dateToSearch).subscribe(
      res => {
        console.log("changedDate");
        this.newDate = "Day: " + res.date;
      },
      err => {
        this.serviceNotification.openSweetAlertError("You do not change this date!");
      }
    );
  }

  getDateForWeek(dateToSearch: Charts) {
    this.chartService.getDateForWeek(dateToSearch).subscribe(
      res => {
        console.log("changedDate");
        this.newDate = "Week: " + res.date;
      },
      err => {
        this.serviceNotification.openSweetAlertError("You do not change this date!");
      }
    );
  }

  getDateForMonth(dateToSearch: Charts) {
    this.chartService.getDateForMonth(dateToSearch).subscribe(
      res => {
        console.log("changedDate");
        this.newDate = "Month: " + res.date;
      },
      err => {
        this.serviceNotification.openSweetAlertError("You do not change this date!");
      }
    );
  }

  getDateForYear(dateToSearch: Charts) {
    this.chartService.getDateForYear(dateToSearch).subscribe(
      res => {
        console.log("changedDate");
        this.newDate = "Year: " + res.date;
      },
      err => {
        this.serviceNotification.openSweetAlertError("You do not change this date!");
      }
    );
  }

  summaryByDay() {
    this.isDate = true;
    this.isMonth = false;
    this.isWeek = false;
    this.isYear = false;

    let newDate = new Date(this.date);
    this.dateS = newDate.toLocaleDateString();
    console.log("newdate" + newDate);
    console.log("dateSDoWysyłki i przetworzenia :: " + this.dateS);

    let dateToSearch: Charts = {
      educationStage: this.selectedEducationStage,
      name: this.selectedName,
      actualYear: this.selectedYear,
      subject: "",
      date: this.dateS,
      time: 0.0
    }

    this.chartService.postDateByDayP(dateToSearch).subscribe(
      res => {
        this.hours = res;
        this.getSubjectsByEducationStage();
        this.getDateByDay(dateToSearch);

        setTimeout(() => {

          let ii = 0;
          for (let i = 0; i < this.hours.length; i++) {
            if (this.hours[i] === 0) {
              ii++;
            }
          }

          setTimeout(() => {

            if (ii === this.hours.length) {
              this.hours = [100];
              this.pieChartData = [
                { data: this.hours },
              ];

              this.pieChartLabels = ['No date'];
            } else {
              this.pieChartData = [
                { data: this.hours },
              ];

              this.pieChartLabels = this.subjects;
            }

          }, 100);

        }, 400);

      },
      err => {
        this.serviceNotification.openSweetAlertError("You do not have any records assigned to given date!");
      }
    );
  }

  summaryByWeek() {

    this.isDate = false;
    this.isMonth = false;
    this.isWeek = true;
    this.isYear = false;

    let newDate = new Date(this.date);
    this.dateS = newDate.toLocaleDateString();
    let newTime = newDate.toTimeString();
    console.log("newdate" + newDate);
    console.log("time" + newTime);
    console.log("dateSDoWysyłki i przetworzenia :: " + this.dateS);

    let dateToSearch: Charts = {
      educationStage: this.selectedEducationStage,
      name: this.selectedName,
      actualYear: this.selectedYear,
      subject: "",
      date: this.dateS,
      time: 0.0
    }

    this.chartService.postDateByWeekP(dateToSearch).subscribe(
      res => {

        this.hours = res;
        this.getSubjectsByEducationStage();
        this.getDateForWeek(dateToSearch);

        setTimeout(() => {
          let ii = 0;
          for (let i = 0; i < this.hours.length; i++) {
            if (this.hours[i] === 0) {
              ii++;
            }
          }

          setTimeout(() => {
            if (ii === this.hours.length) {
              this.hours = [100];
              this.pieChartData = [
                { data: this.hours },
              ];

              this.pieChartLabels = ['No date'];
            } else {
              this.pieChartData = [
                { data: this.hours },
              ];

              this.pieChartLabels = this.subjects;
            }

          }, 100);

        }, 400);
      },
      err => {
        this.serviceNotification.openSweetAlertError("You do not have any records assigned to given date!");
      }
    );
  }

  summaryByMonth() {
    this.isDate = false;
    this.isMonth = true;
    this.isWeek = false;
    this.isYear = false;

    let newDate = new Date(this.date);
    this.dateS = newDate.toLocaleDateString();
    let newTime = newDate.toTimeString();
    console.log("newdate" + newDate);
    console.log("time" + newTime);
    console.log("dateSDoWysyłki i przetworzenia :: " + this.dateS);

    let dateToSearch: Charts = {
      educationStage: this.selectedEducationStage,
      name: this.selectedName,
      actualYear: this.selectedYear,
      subject: "",
      date: this.dateS,
      time: 0.0
    }

    this.chartService.postDateByMonthP(dateToSearch).subscribe(
      res => {
        this.hours = res;
        this.getSubjectsByEducationStage();
        this.getDateForMonth(dateToSearch);

        setTimeout(() => {

          let ii = 0;
          for (let i = 0; i < this.hours.length; i++) {
            if (this.hours[i] === 0) {
              ii++;
            }
          }

          setTimeout(() => {

            if (ii === this.hours.length) {
              this.hours = [100];
              this.pieChartData = [
                { data: this.hours },
              ];

              this.pieChartLabels = ['No date'];
            } else {
              this.pieChartData = [
                { data: this.hours },
              ];

              this.pieChartLabels = this.subjects;
            }

          }, 100);

        }, 400);

      },
      err => {
        this.serviceNotification.openSweetAlertError("You do not have any records assigned to given date!");
      }
    );
  }


  summaryByYear() {
    this.isDate = false;
    this.isMonth = false;
    this.isWeek = false;
    this.isYear = true;

    let newDate = new Date(this.date);
    this.dateS = newDate.toLocaleDateString();
    let newTime = newDate.toTimeString();
    console.log("newdate" + newDate);
    console.log("time" + newTime);
    console.log("dateSDoWysyłki i przetworzenia :: " + this.dateS);

    let dateToSearch: Charts = {
      educationStage: this.selectedEducationStage,
      name: this.selectedName,
      actualYear: this.selectedYear,
      subject: "",
      date: this.dateS,
      time: 0.0
    }

    this.chartService.postDateByYearP(dateToSearch).subscribe(
      res => {
        this.hours = res;
        this.getSubjectsByEducationStage();
        this.getDateForYear(dateToSearch);

        setTimeout(() => {

          let ii = 0;
          for (let i = 0; i < this.hours.length; i++) {
            if (this.hours[i] === 0) {
              ii++;
            }
          }

          setTimeout(() => {

            if (ii === this.hours.length) {
              this.hours = [100];
              this.pieChartData = [
                { data: this.hours },
              ];

              this.pieChartLabels = ['No date'];
            } else {
              this.pieChartData = [
                { data: this.hours },
              ];

              this.pieChartLabels = this.subjects;
            }

          }, 100);

        }, 400);

      },
      err => {
        this.serviceNotification.openSweetAlertError("You do not have any records assigned to given date!");
      }
    );

  }

  previousDate() {
    if (this.isDate === true && this.isWeek === false && this.isMonth === false && this.isYear === false) {
      this.howManyTimesDay += 1;
      console.log(this.howManyTimesDay);

      if (this.howManyTimesDay === 1) {
        let newDate = new Date(this.date);
        this.dateS = newDate.toLocaleDateString();
        console.log("date" + this.date);
        console.log("newdate date stirng" + newDate);
        console.log("dateSDoWysyłki i przetworzenia :: " + this.dateS);
      }


      let dateToSearch: PieChart = {
        educationStage: this.selectedEducationStage,
        name: this.selectedName,
        actualYear: this.selectedYear,
        subjectList: [],
        date: this.dateS,
        dateList: [],
        timeList: []
      }

      this.chartService.postDateByDayPreviousP(dateToSearch).subscribe(
        res => {
          this.dateS = res.date;
          this.newDate = "Day: " + res.date;
          this.hours = res.timeList;

          setTimeout(() => {

            let ii = 0;
            for (let i = 0; i < this.hours.length; i++) {
              if (this.hours[i] === 0) {
                ii++;
              }
            }

            setTimeout(() => {

              if (ii === this.hours.length) {
                this.hours = [100];
                this.pieChartData = [
                  { data: this.hours },
                ];

                this.pieChartLabels = ['No date'];
              } else {
                this.pieChartData = [
                  { data: this.hours },
                ];

                this.pieChartLabels = res.subjectList;
              }

            }, 100);

          }, 400);

        },
        err => {
          this.serviceNotification.openSweetAlertError("You do not have any records assigned to given date!");
        }
      );

    } else if (this.isDate === false && this.isWeek === true && this.isMonth === false && this.isYear === false) {
      this.howManyTimesWeek += 1;
      console.log(this.howManyTimesWeek);

      if (this.howManyTimesWeek === 1) {
        let newDate = new Date(this.date);
        this.dateS = newDate.toLocaleDateString();
        console.log("date" + this.date);
        console.log("newdate date stirng" + newDate);
        console.log("dateSDoWysyłki i przetworzenia :: " + this.dateS);
      }

      let dateToSearch: PieChart = {
        educationStage: this.selectedEducationStage,
        name: this.selectedName,
        actualYear: this.selectedYear,
        subjectList: [],
        date: this.dateS,
        dateList: [],
        timeList: []
      }

      this.chartService.postDateByWeekPreviousP(dateToSearch).subscribe(
        res => {
          this.dateS = res.date;
          this.newDate = "Week: " + res.dateList[0];
          this.hours = res.timeList;

          setTimeout(() => {

            let ii = 0;
            for (let i = 0; i < this.hours.length; i++) {
              if (this.hours[i] === 0) {
                ii++;
              }
            }

            setTimeout(() => {

              if (ii === this.hours.length) {
                this.hours = [100];
                this.pieChartData = [
                  { data: this.hours },
                ];

                this.pieChartLabels = ['No date'];
              } else {
                this.pieChartData = [
                  { data: this.hours },
                ];

                this.pieChartLabels = res.subjectList;
              }

            }, 100);

          }, 400);
        },
        err => {
          this.serviceNotification.openSweetAlertError("You do not have any records assigned to given date!");
        }
      );

    } else if (this.isDate === false && this.isWeek === false && this.isMonth === true && this.isYear === false) {

      this.howManyTimesMonth += 1;
      console.log(this.howManyTimesMonth);

      if (this.howManyTimesMonth === 1) {
        let newDate = new Date(this.date);
        this.dateS = newDate.toLocaleDateString();
        console.log("date" + this.date);
        console.log("newdate date stirng" + newDate);
        console.log("dateSDoWysyłki i przetworzenia :: " + this.dateS);
      }

      let dateToSearch: PieChart = {
        educationStage: this.selectedEducationStage,
        name: this.selectedName,
        actualYear: this.selectedYear,
        subjectList: [],
        date: this.dateS,
        dateList: [],
        timeList: []
      }

      this.chartService.postDateByMonthPreviousP(dateToSearch).subscribe(
        res => {
          this.dateS = res.date;
          this.newDate = "Month: " + res.dateList[0];
          this.hours = res.timeList;

          setTimeout(() => {

            let ii = 0;
            for (let i = 0; i < this.hours.length; i++) {
              if (this.hours[i] === 0) {
                ii++;
              }
            }

            setTimeout(() => {

              if (ii === this.hours.length) {
                this.hours = [100];
                this.pieChartData = [
                  { data: this.hours },
                ];

                this.pieChartLabels = ['No date'];
              } else {
                this.pieChartData = [
                  { data: this.hours },
                ];

                this.pieChartLabels = res.subjectList;
              }

            }, 100);

          }, 400);

        },
        err => {
          this.serviceNotification.openSweetAlertError("You do not have any records assigned to given date!");
        }
      );

    } else if (this.isDate === false && this.isWeek === false && this.isMonth === false && this.isYear === true) {

      this.howManyTimesYear += 1;
      console.log(this.howManyTimesYear);

      if (this.howManyTimesYear === 1) {
        let newDate = new Date(this.date);
        this.dateS = newDate.toLocaleDateString();
        console.log("date" + this.date);
        console.log("newdate date stirng" + newDate);
        console.log("dateSDoWysyłki i przetworzenia :: " + this.dateS);
      }

      let dateToSearch: PieChart = {
        educationStage: this.selectedEducationStage,
        name: this.selectedName,
        actualYear: this.selectedYear,
        subjectList: [],
        date: this.dateS,
        dateList: [],
        timeList: []
      }

      this.chartService.postDateByYearPreviousP(dateToSearch).subscribe(
        res => {
          this.dateS = res.date;
          this.newDate = "Year: " + res.dateList[0];
          this.hours = res.timeList;

          setTimeout(() => {

            let ii = 0;
            for (let i = 0; i < this.hours.length; i++) {
              if (this.hours[i] === 0) {
                ii++;
              }
            }

            setTimeout(() => {

              if (ii === this.hours.length) {
                this.hours = [100];
                this.pieChartData = [
                  { data: this.hours },
                ];

                this.pieChartLabels = ['No date'];
              } else {
                this.pieChartData = [
                  { data: this.hours },
                ];

                this.pieChartLabels = res.subjectList;
              }

            }, 100);

          }, 400);
        },
        err => {
          this.serviceNotification.openSweetAlertError("You do not have any records assigned to given date!");
        }
      );
    }

  }

  forwardDate() {
    if (this.isDate === true && this.isWeek === false && this.isMonth === false && this.isYear === false) {
      this.howManyTimesDay += 1;
      console.log(this.howManyTimesDay);

      if (this.howManyTimesDay === 1) {
        let newDate = new Date(this.date);
        this.dateS = newDate.toLocaleDateString();
        console.log("date" + this.date);
        console.log("newdate date stirng" + newDate);
        console.log("dateSDoWysyłki i przetworzenia :: " + this.dateS);
      }


      let dateToSearch: PieChart = {
        educationStage: this.selectedEducationStage,
        name: this.selectedName,
        actualYear: this.selectedYear,
        subjectList: [],
        date: this.dateS,
        dateList: [],
        timeList: []
      }

      this.chartService.postDateByDayNextP(dateToSearch).subscribe(
        res => {
          this.dateS = res.date;
          this.newDate = "Day: " + res.date;
          this.hours = res.timeList;

          setTimeout(() => {

            let ii = 0;
            for (let i = 0; i < this.hours.length; i++) {
              if (this.hours[i] === 0) {
                ii++;
              }
            }

            setTimeout(() => {

              if (ii === this.hours.length) {
                this.hours = [100];
                this.pieChartData = [
                  { data: this.hours },
                ];

                this.pieChartLabels = ['No date'];
              } else {
                this.pieChartData = [
                  { data: this.hours },
                ];

                this.pieChartLabels = res.subjectList;
              }

            }, 100);

          }, 400);

        },
        err => {
          this.serviceNotification.openSweetAlertError("You do not have any records assigned to given date!");
        }
      );

    } else if (this.isDate === false && this.isWeek === true && this.isMonth === false && this.isYear === false) {
      this.howManyTimesWeek += 1;
      console.log(this.howManyTimesWeek);

      if (this.howManyTimesWeek === 1) {
        let newDate = new Date(this.date);
        this.dateS = newDate.toLocaleDateString();
        console.log("date" + this.date);
        console.log("newdate date stirng" + newDate);
        console.log("dateSDoWysyłki i przetworzenia :: " + this.dateS);
      }

      let dateToSearch: PieChart = {
        educationStage: this.selectedEducationStage,
        name: this.selectedName,
        actualYear: this.selectedYear,
        subjectList: [],
        date: this.dateS,
        dateList: [],
        timeList: []
      }

      this.chartService.postDateByWeekNextP(dateToSearch).subscribe(
        res => {
          this.dateS = res.date;
          this.newDate = "Week: " + res.dateList[0];
          this.hours = res.timeList;

          setTimeout(() => {

            let ii = 0;
            for (let i = 0; i < this.hours.length; i++) {
              if (this.hours[i] === 0) {
                ii++;
              }
            }

            setTimeout(() => {

              if (ii === this.hours.length) {
                this.hours = [100];
                this.pieChartData = [
                  { data: this.hours },
                ];

                this.pieChartLabels = ['No date'];
              } else {
                this.pieChartData = [
                  { data: this.hours },
                ];

                this.pieChartLabels = res.subjectList;
              }

            }, 100);

          }, 400);
        },
        err => {
          this.serviceNotification.openSweetAlertError("You do not have any records assigned to given date!");
        }
      );

    } else if (this.isDate === false && this.isWeek === false && this.isMonth === true && this.isYear === false) {

      this.howManyTimesMonth += 1;
      console.log(this.howManyTimesMonth);

      if (this.howManyTimesMonth === 1) {
        let newDate = new Date(this.date);
        this.dateS = newDate.toLocaleDateString();
        console.log("date" + this.date);
        console.log("newdate date stirng" + newDate);
        console.log("dateSDoWysyłki i przetworzenia :: " + this.dateS);
      }

      let dateToSearch: PieChart = {
        educationStage: this.selectedEducationStage,
        name: this.selectedName,
        actualYear: this.selectedYear,
        subjectList: [],
        date: this.dateS,
        dateList: [],
        timeList: []
      }

      this.chartService.postDateByMonthNextP(dateToSearch).subscribe(
        res => {
          this.dateS = res.date;
          this.newDate = "Month: " + res.dateList[0];
          this.hours = res.timeList;

          setTimeout(() => {

            let ii = 0;
            for (let i = 0; i < this.hours.length; i++) {
              if (this.hours[i] === 0) {
                ii++;
              }
            }

            setTimeout(() => {

              if (ii === this.hours.length) {
                this.hours = [100];
                this.pieChartData = [
                  { data: this.hours },
                ];

                this.pieChartLabels = ['No date'];
              } else {
                this.pieChartData = [
                  { data: this.hours },
                ];

                this.pieChartLabels = res.subjectList;
              }

            }, 100);

          }, 400);

        },
        err => {
          this.serviceNotification.openSweetAlertError("You do not have any records assigned to given date!");
        }
      );

    } else if (this.isDate === false && this.isWeek === false && this.isMonth === false && this.isYear === true) {

      this.howManyTimesYear += 1;
      console.log(this.howManyTimesYear);

      if (this.howManyTimesYear === 1) {
        let newDate = new Date(this.date);
        this.dateS = newDate.toLocaleDateString();
        console.log("date" + this.date);
        console.log("newdate date stirng" + newDate);
        console.log("dateSDoWysyłki i przetworzenia :: " + this.dateS);
      }

      let dateToSearch: PieChart = {
        educationStage: this.selectedEducationStage,
        name: this.selectedName,
        actualYear: this.selectedYear,
        subjectList: [],
        date: this.dateS,
        dateList: [],
        timeList: []
      }

      this.chartService.postDateByYearNextP(dateToSearch).subscribe(
        res => {
          this.dateS = res.date;
          this.newDate = "Year: " + res.dateList[0];
          this.hours = res.timeList;

          setTimeout(() => {

            let ii = 0;
            for (let i = 0; i < this.hours.length; i++) {
              if (this.hours[i] === 0) {
                ii++;
              }
            }

            setTimeout(() => {

              if (ii === this.hours.length) {
                this.hours = [100];
                this.pieChartData = [
                  { data: this.hours },
                ];

                this.pieChartLabels = ['No date'];
              } else {
                this.pieChartData = [
                  { data: this.hours },
                ];

                this.pieChartLabels = res.subjectList;
              }

            }, 100);

          }, 400);
        },
        err => {
          this.serviceNotification.openSweetAlertError("You do not have any records assigned to given date!");
        }
      );
    }
  }

  downloadCanvas(event: any) {
    var anchor = event.target;
    anchor.href = document.getElementsByTagName('canvas')[0].toDataURL();
    anchor.download = "summaryPerSubject.png";
  }

}
