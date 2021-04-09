import { Component, OnInit } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { CounterUpTimer } from '../model/counter-time-up';
import { CounterUpTimerService } from '../service/counter-up-timer.service';
import { NotificationsAllService } from '../service/notifications.service';
import { ChartOptions, ChartType } from 'chart.js';
import { ChartsService } from '../service/charts.service';
import { Charts } from '../model/charts';
import { Router } from '@angular/router';
import { RegistrationService } from '../service/registration.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
  providers: [{ provide: MatFormFieldControl, useExisting: MatFormFieldControl }]

})
export class ChartsForSubjectComponent implements OnInit {

  alleducationStagesDistinct: String[] = [];
  allNameDistinct: String[] = [];
  allYearDistinct: String[] = [];
  subjects: String[] = [];

  selectedEducationStage: any;
  selectedName: any;
  selectedYear: any;
  selectedSubject: string = "";

  objectIdGainedByEducationStageAndNameAndYear: number = 0;

  date: string = "";
  dateS: string = "";

  isDisalbed: boolean = true;

  timePerDay!: Charts;
  timePerDayA: Charts[] = [];
  timePerWeek: Charts[] = [];
  timePerMonth: Charts[] = [];

  isDate: boolean = false;
  isWeek: boolean = false;
  isMonth: boolean = false;
  isYear: boolean = false;

  howManyTimesDay: number = 0;
  howManyTimesWeek: number = 0;
  howManyTimesMonth: number = 0;
  howManyTimesYear: number = 0;

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Number of hours",
          },
          ticks: {
            suggestedMin: 0,
            beginAtZero: true,
            stepSize: 5
          }
        },
      ],
      xAxes: [
        {

          scaleLabel: {
            display: true,
            labelString: "Date",
          },

        },
      ],
    },
  }
  dataaaa: string = ""
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: [{
    barPercentage: number; barThickness: number; maxBarThickness: number;
    minBarLength: number;
    data:
    number[], label: string

  }] = [{
    barPercentage: 0.9,
    barThickness: 80,
    maxBarThickness: 1000,
    minBarLength: 0,
    data: [],
    label: ""
  }]

  constructor(private serviceNotification: NotificationsAllService, private serviceCounterUp: CounterUpTimerService
    , private chartService: ChartsService, private registration: RegistrationService,private router: Router) {
      this.getAllEducationStagesDistinct();
     }

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

  downloadCanvas(event: any) {
    var anchor = event.target;
    anchor.href = document.getElementsByTagName('canvas')[0].toDataURL();
    anchor.download = "summaryPerSubject.png";
  }

  summaryByDay() {

    this.isDate = true;
    this.isMonth = false;
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
      subject: this.selectedSubject,
      date: this.dateS,
      time: 0.0
    }

    this.chartService.postDateByDayS(dateToSearch).subscribe(
      res => {
        this.timePerDay = res;
        this.dateS = res.date;

        setTimeout(() => {

          this.barChartLabels = [this.timePerDay.date];
          this.barChartData = [{
            barPercentage: 0.9,
            barThickness: 80,
            maxBarThickness: 1000,
            minBarLength: 0,
            data: [this.timePerDay.time],
            label: this.selectedSubject
          }]

        }, 500);
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
      subject: this.selectedSubject,
      date: this.dateS,
      time: 0.0
    }

    this.chartService.postDateByWeekS(dateToSearch).subscribe(
      res => {
        this.timePerWeek = res;

        setTimeout(() => {
          console.log(this.timePerWeek[0].date);
          this.barChartLabels = [this.timePerWeek[0].date, this.timePerWeek[1].date, this.timePerWeek[2].date, this.timePerWeek[3].date,
          this.timePerWeek[4].date, this.timePerWeek[5].date, this.timePerWeek[6].date];
          this.barChartData = [{
            barPercentage: 0.9,
            barThickness: 40,
            maxBarThickness: 1000,
            minBarLength: 0,
            data: [this.timePerWeek[0].time, this.timePerWeek[1].time, this.timePerWeek[2].time, this.timePerWeek[3].time, this.timePerWeek[4].time,
            this.timePerWeek[5].time, this.timePerWeek[6].time],
            label: this.selectedSubject
          }]
        }, 500);
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
      subject: this.selectedSubject,
      date: this.dateS,
      time: 0.0
    }

    this.chartService.postDateByMonthS(dateToSearch).subscribe(
      res => {
        this.timePerMonth = res;

        setTimeout(() => {

          let numberOfMonth: number = this.getMonth(this.dateS);
          console.log(numberOfMonth)
          if (numberOfMonth === 2) {
            console.log(this.timePerMonth[0].date.substring(0, 4))
            let year = Number(this.timePerMonth[0].date.substring(0, 4));
            console.log("yera: to leap :  " + year)
            if (this.isLeapYear(year) === true) {


              console.log("leap data");
              this.barChartLabels = [this.timePerMonth[0].date, this.timePerMonth[1].date, this.timePerMonth[2].date, this.timePerMonth[3].date
                , this.timePerMonth[4].date, this.timePerMonth[5].date, this.timePerMonth[6].date, this.timePerMonth[7].date, this.timePerMonth[8].date
                , this.timePerMonth[9].date, this.timePerMonth[10].date, this.timePerMonth[11].date, this.timePerMonth[12].date, this.timePerMonth[13].date,
              this.timePerMonth[14].date, this.timePerMonth[15].date, this.timePerMonth[16].date, this.timePerMonth[17].date, this.timePerMonth[18].date,
              this.timePerMonth[19].date, this.timePerMonth[20].date, this.timePerMonth[21].date, this.timePerMonth[22].date,
              this.timePerMonth[23].date, this.timePerMonth[24].date, this.timePerMonth[25].date, this.timePerMonth[26].date,
              this.timePerMonth[27].date, this.timePerMonth[28].date];

              this.barChartData = [{
                barPercentage: 0.9,
                barThickness: 14,
                maxBarThickness: 25,
                minBarLength: 0,

                data: [this.timePerMonth[0].time, this.timePerMonth[1].time, this.timePerMonth[2].time, this.timePerMonth[3].time
                  , this.timePerMonth[4].time, this.timePerMonth[5].time, this.timePerMonth[6].time, this.timePerMonth[7].time, this.timePerMonth[8].time
                  , this.timePerMonth[9].time, this.timePerMonth[10].time, this.timePerMonth[11].time, this.timePerMonth[12].time, this.timePerMonth[13].time,
                this.timePerMonth[14].time, this.timePerMonth[15].time, this.timePerMonth[16].time, this.timePerMonth[17].time, this.timePerMonth[18].time,
                this.timePerMonth[19].time, this.timePerMonth[20].time, this.timePerMonth[21].time, this.timePerMonth[22].time,
                this.timePerMonth[23].time, this.timePerMonth[24].time, this.timePerMonth[25].time, this.timePerMonth[26].time,
                this.timePerMonth[27].time, this.timePerMonth[28].time],
                label: this.selectedSubject
              }]


            } else {

              console.log("not leap data");
              this.barChartLabels = [this.timePerMonth[0].date, this.timePerMonth[1].date, this.timePerMonth[2].date, this.timePerMonth[3].date
                , this.timePerMonth[4].date, this.timePerMonth[5].date, this.timePerMonth[6].date, this.timePerMonth[7].date, this.timePerMonth[8].date
                , this.timePerMonth[9].date, this.timePerMonth[10].date, this.timePerMonth[11].date, this.timePerMonth[12].date, this.timePerMonth[13].date,
              this.timePerMonth[14].date, this.timePerMonth[15].date, this.timePerMonth[16].date, this.timePerMonth[17].date, this.timePerMonth[18].date,
              this.timePerMonth[19].date, this.timePerMonth[20].date, this.timePerMonth[21].date, this.timePerMonth[22].date,
              this.timePerMonth[23].date, this.timePerMonth[24].date, this.timePerMonth[25].date, this.timePerMonth[26].date,
              this.timePerMonth[27].date];

              this.barChartData = [{
                barPercentage: 0.9,
                barThickness: 14,
                maxBarThickness: 25,
                minBarLength: 0,

                data: [this.timePerMonth[0].time, this.timePerMonth[1].time, this.timePerMonth[2].time, this.timePerMonth[3].time
                  , this.timePerMonth[4].time, this.timePerMonth[5].time, this.timePerMonth[6].time, this.timePerMonth[7].time, this.timePerMonth[8].time
                  , this.timePerMonth[9].time, this.timePerMonth[10].time, this.timePerMonth[11].time, this.timePerMonth[12].time, this.timePerMonth[13].time,
                this.timePerMonth[14].time, this.timePerMonth[15].time, this.timePerMonth[16].time, this.timePerMonth[17].time, this.timePerMonth[18].time,
                this.timePerMonth[19].time, this.timePerMonth[20].time, this.timePerMonth[21].time, this.timePerMonth[22].time,
                this.timePerMonth[23].time, this.timePerMonth[24].time, this.timePerMonth[25].time, this.timePerMonth[26].time,
                this.timePerMonth[27].time],
                label: this.selectedSubject
              }]

            }
          } else if (numberOfMonth <= 7) {
            if (this.isOdd(numberOfMonth) === true) {

              console.log("not leap data");
              this.barChartLabels = [this.timePerMonth[0].date, this.timePerMonth[1].date, this.timePerMonth[2].date, this.timePerMonth[3].date
                , this.timePerMonth[4].date, this.timePerMonth[5].date, this.timePerMonth[6].date, this.timePerMonth[7].date, this.timePerMonth[8].date
                , this.timePerMonth[9].date, this.timePerMonth[10].date, this.timePerMonth[11].date, this.timePerMonth[12].date, this.timePerMonth[13].date,
              this.timePerMonth[14].date, this.timePerMonth[15].date, this.timePerMonth[16].date, this.timePerMonth[17].date, this.timePerMonth[18].date,
              this.timePerMonth[19].date, this.timePerMonth[20].date, this.timePerMonth[21].date, this.timePerMonth[22].date,
              this.timePerMonth[23].date, this.timePerMonth[24].date, this.timePerMonth[25].date, this.timePerMonth[26].date,
              this.timePerMonth[27].date, this.timePerMonth[28].date, this.timePerMonth[29].date, this.timePerMonth[30].date];

              this.barChartData = [{
                barPercentage: 0.9,
                barThickness: 14,
                maxBarThickness: 25,
                minBarLength: 0,

                data: [this.timePerMonth[0].time, this.timePerMonth[1].time, this.timePerMonth[2].time, this.timePerMonth[3].time
                  , this.timePerMonth[4].time, this.timePerMonth[5].time, this.timePerMonth[6].time, this.timePerMonth[7].time, this.timePerMonth[8].time
                  , this.timePerMonth[9].time, this.timePerMonth[10].time, this.timePerMonth[11].time, this.timePerMonth[12].time, this.timePerMonth[13].time,
                this.timePerMonth[14].time, this.timePerMonth[15].time, this.timePerMonth[16].time, this.timePerMonth[17].time, this.timePerMonth[18].time,
                this.timePerMonth[19].time, this.timePerMonth[20].time, this.timePerMonth[21].time, this.timePerMonth[22].time,
                this.timePerMonth[23].time, this.timePerMonth[24].time, this.timePerMonth[25].time, this.timePerMonth[26].time,
                this.timePerMonth[27].time, this.timePerMonth[28].time, this.timePerMonth[29].time, this.timePerMonth[30].time],
                label: this.selectedSubject
              }]

            } else {
              console.log("not leap data");
              this.barChartLabels = [this.timePerMonth[0].date, this.timePerMonth[1].date, this.timePerMonth[2].date, this.timePerMonth[3].date
                , this.timePerMonth[4].date, this.timePerMonth[5].date, this.timePerMonth[6].date, this.timePerMonth[7].date, this.timePerMonth[8].date
                , this.timePerMonth[9].date, this.timePerMonth[10].date, this.timePerMonth[11].date, this.timePerMonth[12].date, this.timePerMonth[13].date,
              this.timePerMonth[14].date, this.timePerMonth[15].date, this.timePerMonth[16].date, this.timePerMonth[17].date, this.timePerMonth[18].date,
              this.timePerMonth[19].date, this.timePerMonth[20].date, this.timePerMonth[21].date, this.timePerMonth[22].date,
              this.timePerMonth[23].date, this.timePerMonth[24].date, this.timePerMonth[25].date, this.timePerMonth[26].date,
              this.timePerMonth[27].date, this.timePerMonth[28].date, this.timePerMonth[29].date];

              this.barChartData = [{
                barPercentage: 0.9,
                barThickness: 14,
                maxBarThickness: 25,
                minBarLength: 0,

                data: [this.timePerMonth[0].time, this.timePerMonth[1].time, this.timePerMonth[2].time, this.timePerMonth[3].time
                  , this.timePerMonth[4].time, this.timePerMonth[5].time, this.timePerMonth[6].time, this.timePerMonth[7].time, this.timePerMonth[8].time
                  , this.timePerMonth[9].time, this.timePerMonth[10].time, this.timePerMonth[11].time, this.timePerMonth[12].time, this.timePerMonth[13].time,
                this.timePerMonth[14].time, this.timePerMonth[15].time, this.timePerMonth[16].time, this.timePerMonth[17].time, this.timePerMonth[18].time,
                this.timePerMonth[19].time, this.timePerMonth[20].time, this.timePerMonth[21].time, this.timePerMonth[22].time,
                this.timePerMonth[23].time, this.timePerMonth[24].time, this.timePerMonth[25].time, this.timePerMonth[26].time,
                this.timePerMonth[27].time, this.timePerMonth[28].time, this.timePerMonth[29].time],
                label: this.selectedSubject
              }]

            }

          } else {

            if (this.isEven(numberOfMonth)) {
              console.log("not leap data");
              this.barChartLabels = [this.timePerMonth[0].date, this.timePerMonth[1].date, this.timePerMonth[2].date, this.timePerMonth[3].date
                , this.timePerMonth[4].date, this.timePerMonth[5].date, this.timePerMonth[6].date, this.timePerMonth[7].date, this.timePerMonth[8].date
                , this.timePerMonth[9].date, this.timePerMonth[10].date, this.timePerMonth[11].date, this.timePerMonth[12].date, this.timePerMonth[13].date,
              this.timePerMonth[14].date, this.timePerMonth[15].date, this.timePerMonth[16].date, this.timePerMonth[17].date, this.timePerMonth[18].date,
              this.timePerMonth[19].date, this.timePerMonth[20].date, this.timePerMonth[21].date, this.timePerMonth[22].date,
              this.timePerMonth[23].date, this.timePerMonth[24].date, this.timePerMonth[25].date, this.timePerMonth[26].date,
              this.timePerMonth[27].date, this.timePerMonth[28].date, this.timePerMonth[29].date, this.timePerMonth[30].date];

              this.barChartData = [{
                barPercentage: 0.9,
                barThickness: 14,
                maxBarThickness: 25,
                minBarLength: 0,

                data: [this.timePerMonth[0].time, this.timePerMonth[1].time, this.timePerMonth[2].time, this.timePerMonth[3].time
                  , this.timePerMonth[4].time, this.timePerMonth[5].time, this.timePerMonth[6].time, this.timePerMonth[7].time, this.timePerMonth[8].time
                  , this.timePerMonth[9].time, this.timePerMonth[10].time, this.timePerMonth[11].time, this.timePerMonth[12].time, this.timePerMonth[13].time,
                this.timePerMonth[14].time, this.timePerMonth[15].time, this.timePerMonth[16].time, this.timePerMonth[17].time, this.timePerMonth[18].time,
                this.timePerMonth[19].time, this.timePerMonth[20].time, this.timePerMonth[21].time, this.timePerMonth[22].time,
                this.timePerMonth[23].time, this.timePerMonth[24].time, this.timePerMonth[25].time, this.timePerMonth[26].time,
                this.timePerMonth[27].time, this.timePerMonth[28].time, this.timePerMonth[29].time, this.timePerMonth[30].time],
                label: this.selectedSubject
              }]
            } else {

              console.log("not leap data");
              this.barChartLabels = [this.timePerMonth[0].date, this.timePerMonth[1].date, this.timePerMonth[2].date, this.timePerMonth[3].date
                , this.timePerMonth[4].date, this.timePerMonth[5].date, this.timePerMonth[6].date, this.timePerMonth[7].date, this.timePerMonth[8].date
                , this.timePerMonth[9].date, this.timePerMonth[10].date, this.timePerMonth[11].date, this.timePerMonth[12].date, this.timePerMonth[13].date,
              this.timePerMonth[14].date, this.timePerMonth[15].date, this.timePerMonth[16].date, this.timePerMonth[17].date, this.timePerMonth[18].date,
              this.timePerMonth[19].date, this.timePerMonth[20].date, this.timePerMonth[21].date, this.timePerMonth[22].date,
              this.timePerMonth[23].date, this.timePerMonth[24].date, this.timePerMonth[25].date, this.timePerMonth[26].date,
              this.timePerMonth[27].date, this.timePerMonth[28].date, this.timePerMonth[29].date];

              this.barChartData = [{
                barPercentage: 0.9,
                barThickness: 14,
                maxBarThickness: 25,
                minBarLength: 0,

                data: [this.timePerMonth[0].time, this.timePerMonth[1].time, this.timePerMonth[2].time, this.timePerMonth[3].time
                  , this.timePerMonth[4].time, this.timePerMonth[5].time, this.timePerMonth[6].time, this.timePerMonth[7].time, this.timePerMonth[8].time
                  , this.timePerMonth[9].time, this.timePerMonth[10].time, this.timePerMonth[11].time, this.timePerMonth[12].time, this.timePerMonth[13].time,
                this.timePerMonth[14].time, this.timePerMonth[15].time, this.timePerMonth[16].time, this.timePerMonth[17].time, this.timePerMonth[18].time,
                this.timePerMonth[19].time, this.timePerMonth[20].time, this.timePerMonth[21].time, this.timePerMonth[22].time,
                this.timePerMonth[23].time, this.timePerMonth[24].time, this.timePerMonth[25].time, this.timePerMonth[26].time,
                this.timePerMonth[27].time, this.timePerMonth[28].time, this.timePerMonth[29].time],
                label: this.selectedSubject
              }]

            }

          }

        }, 500);

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
      subject: this.selectedSubject,
      date: this.dateS,
      time: 0.0
    }

    this.chartService.postDateByYearS(dateToSearch).subscribe(
      res => {
        this.timePerMonth = res;
        console.log(this.timePerMonth[0].date);
        console.log(this.timePerMonth[0].time);


        setTimeout(() => {
          console.log("glowna funkcja" + this.timePerMonth[0].date);
          this.barChartLabels = [this.timePerMonth[0].date, this.timePerMonth[1].date, this.timePerMonth[2].date, this.timePerMonth[3].date
            , this.timePerMonth[4].date, this.timePerMonth[5].date, this.timePerMonth[6].date, this.timePerMonth[7].date, this.timePerMonth[8].date
            , this.timePerMonth[9].date, this.timePerMonth[10].date, this.timePerMonth[11].date];
          this.barChartData = [{
            barPercentage: 0.9,
            barThickness: 25,
            maxBarThickness: 100,
            minBarLength: 0,
            data: [this.timePerMonth[0].time, this.timePerMonth[1].time, this.timePerMonth[2].time, this.timePerMonth[3].time, this.timePerMonth[4].time
              , this.timePerMonth[5].time, this.timePerMonth[6].time, this.timePerMonth[7].time, this.timePerMonth[8].time, this.timePerMonth[9].time
              , this.timePerMonth[10].time, this.timePerMonth[11].time],
            label: this.selectedSubject
          }]
        }, 500);

      },
      err => {
        this.serviceNotification.openSweetAlertError("You do not have any records assigned to given date!");
      }
    );


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


  getEducationStage() {
    this.isDisalbed = true;
    this.allNameDistinct = [];
    this.allYearDistinct = [];
    this.subjects = [];
    console.log("educationstage" + this.selectedEducationStage);
    this.getNameDistinctByEducationStage();
    this.selectedYear = undefined;
  }

  getName() {
    this.isDisalbed = true;
    this.allYearDistinct = [];
    this.subjects = [];
    console.log("name" + this.selectedName);
    this.getYearDistinctByEducationStageAndName();
  }

  getYear() {


    console.log(this.selectedYear);

    this.subjects = [];
    console.log(this.selectedYear);
    if (this.selectedYear !== undefined) {
      this.getSubjectsByEducationStage();
    }

  }

  getSubject() {
    console.log("selectedsubjectbefore::" + this.selectedSubject.length);
    console.log("selectedsubjectbefore::" + this.selectedSubject);
    if (this.selectedEducationStage !== undefined && this.selectedName !== undefined && this.selectedYear !== undefined
      && this.selectedSubject !== "") {
      this.isDisalbed = false;
    }
    console.log(this.selectedSubject.length);
    console.log(this.selectedSubject);
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




  isLeapYear(year: number): boolean {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
  }

  getMonth(date: string): number {
    let substring: String = "";
    let substring1: String = "";

    console.log("date " + date);
    if (date.length === 9) {
      console.log("length for nine/9 " + (date.length));
      substring = date.substring(2, 4);
      console.log("subsetFor9: " + substring);
      if (substring.charAt(0) == '0') {
        substring1 = substring.substring(1, substring.length);
        console.log("valueOfFor9.1 " + Number(substring1));
        return Number(substring1);

      } else {
        substring1 = substring.substring(0, substring.length);
        console.log("valueOfFor9.2 " + Number(substring1));
        return Number(substring1);
      }

    } else {
      substring = date.substring(3, 5);
      console.log(substring);
      if (substring.charAt(0) == '0') {
        substring1 = substring.substring(1, substring.length);
        console.log("valueOfFor10.1 " + Number(substring1));
        return Number(substring1);
      } else {
        substring1 = substring.substring(0, substring.length);
        console.log("valueOfFor10.2 " + Number(substring1));
        return Number(substring1);
      }
    }

  }

  getMonthShort(date: string): number {
    let substring: String = "";
    let substring1: String = "";
    substring = date.substring(5, 7);
    console.log(substring);
    if (substring.charAt(0) === '0') {
      substring1 = substring.substring(1, substring.length);
      console.log("valueOfFor10.1 " + Number(substring1));
      return Number(substring1);
    } else {
      substring1 = substring.substring(0, substring.length);
      console.log("valueOfFor10.2 " + Number(substring1));
      return Number(substring1);
    }
  }

  isEven(evenNumber: number): boolean {
    return evenNumber % 2 == 0;
  }

  isOdd(oddNumber: number): boolean {
    return oddNumber % 2 != 0;
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


      let dateToSearch: Charts = {
        educationStage: this.selectedEducationStage,
        name: this.selectedName,
        actualYear: this.selectedYear,
        subject: this.selectedSubject,
        date: this.dateS,
        time: 0.0
      }

      this.chartService.postDateByDayPreviousS(dateToSearch).subscribe(
        res => {
          this.timePerDayA = res;
          this.dateS = res[0].date;
          setTimeout(() => {
            this.barChartLabels = [this.timePerDayA[0].date];
            this.barChartData = [{
              barPercentage: 0.9,
              barThickness: 80,
              maxBarThickness: 1000,
              minBarLength: 0,
              data: [this.timePerDayA[0].time],
              label: this.selectedSubject
            }]
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



      let dateToSearch: Charts = {
        educationStage: this.selectedEducationStage,
        name: this.selectedName,
        actualYear: this.selectedYear,
        subject: this.selectedSubject,
        date: this.dateS,
        time: 0.0
      }

      this.chartService.postDateByWeekPreviousS(dateToSearch).subscribe(
        res => {
          this.timePerWeek = res;
          this.dateS = res[0].date;

          setTimeout(() => {
            console.log(this.timePerWeek[0].date);
            this.barChartLabels = [this.timePerWeek[0].date, this.timePerWeek[1].date, this.timePerWeek[2].date, this.timePerWeek[3].date,
            this.timePerWeek[4].date, this.timePerWeek[5].date, this.timePerWeek[6].date];
            this.barChartData = [{
              barPercentage: 0.9,
              barThickness: 40,
              maxBarThickness: 1000,
              minBarLength: 0,
              data: [this.timePerWeek[0].time, this.timePerWeek[1].time, this.timePerWeek[2].time, this.timePerWeek[3].time, this.timePerWeek[4].time,
              this.timePerWeek[5].time, this.timePerWeek[6].time],
              label: this.selectedSubject
            }]
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

      let dateToSearch: Charts = {
        educationStage: this.selectedEducationStage,
        name: this.selectedName,
        actualYear: this.selectedYear,
        subject: this.selectedSubject,
        date: this.dateS,
        time: 0.0
      }

      this.chartService.postDateByMonthPreviousS(dateToSearch).subscribe(
        res => {
          this.timePerMonth = res;
          console.log(res[0].date)
          this.dateS = res[0].date;

          setTimeout(() => {
            let numberOfMonth: number = this.getMonthShort(this.dateS);
            console.log(numberOfMonth)
            if (numberOfMonth === 2) {
              console.log(this.timePerMonth[0].date.substring(0, 4))
              let year = Number(this.timePerMonth[0].date.substring(0, 4));
              console.log("yera: to leap :  " + year)
              if (this.isLeapYear(year) === true) {


                console.log("leap data");
                this.barChartLabels = [this.timePerMonth[0].date, this.timePerMonth[1].date, this.timePerMonth[2].date, this.timePerMonth[3].date
                  , this.timePerMonth[4].date, this.timePerMonth[5].date, this.timePerMonth[6].date, this.timePerMonth[7].date, this.timePerMonth[8].date
                  , this.timePerMonth[9].date, this.timePerMonth[10].date, this.timePerMonth[11].date, this.timePerMonth[12].date, this.timePerMonth[13].date,
                this.timePerMonth[14].date, this.timePerMonth[15].date, this.timePerMonth[16].date, this.timePerMonth[17].date, this.timePerMonth[18].date,
                this.timePerMonth[19].date, this.timePerMonth[20].date, this.timePerMonth[21].date, this.timePerMonth[22].date,
                this.timePerMonth[23].date, this.timePerMonth[24].date, this.timePerMonth[25].date, this.timePerMonth[26].date,
                this.timePerMonth[27].date, this.timePerMonth[28].date];

                this.barChartData = [{
                  barPercentage: 0.9,
                  barThickness: 14,
                  maxBarThickness: 100,
                  minBarLength: 0,

                  data: [this.timePerMonth[0].time, this.timePerMonth[1].time, this.timePerMonth[2].time, this.timePerMonth[3].time
                    , this.timePerMonth[4].time, this.timePerMonth[5].time, this.timePerMonth[6].time, this.timePerMonth[7].time, this.timePerMonth[8].time
                    , this.timePerMonth[9].time, this.timePerMonth[10].time, this.timePerMonth[11].time, this.timePerMonth[12].time, this.timePerMonth[13].time,
                  this.timePerMonth[14].time, this.timePerMonth[15].time, this.timePerMonth[16].time, this.timePerMonth[17].time, this.timePerMonth[18].time,
                  this.timePerMonth[19].time, this.timePerMonth[20].time, this.timePerMonth[21].time, this.timePerMonth[22].time,
                  this.timePerMonth[23].time, this.timePerMonth[24].time, this.timePerMonth[25].time, this.timePerMonth[26].time,
                  this.timePerMonth[27].time, this.timePerMonth[28].time],
                  label: this.selectedSubject
                }]


              } else {

                console.log("not leap data");
                this.barChartLabels = [this.timePerMonth[0].date, this.timePerMonth[1].date, this.timePerMonth[2].date, this.timePerMonth[3].date
                  , this.timePerMonth[4].date, this.timePerMonth[5].date, this.timePerMonth[6].date, this.timePerMonth[7].date, this.timePerMonth[8].date
                  , this.timePerMonth[9].date, this.timePerMonth[10].date, this.timePerMonth[11].date, this.timePerMonth[12].date, this.timePerMonth[13].date,
                this.timePerMonth[14].date, this.timePerMonth[15].date, this.timePerMonth[16].date, this.timePerMonth[17].date, this.timePerMonth[18].date,
                this.timePerMonth[19].date, this.timePerMonth[20].date, this.timePerMonth[21].date, this.timePerMonth[22].date,
                this.timePerMonth[23].date, this.timePerMonth[24].date, this.timePerMonth[25].date, this.timePerMonth[26].date,
                this.timePerMonth[27].date];

                this.barChartData = [{
                  barPercentage: 0.9,
                  barThickness: 14,
                  maxBarThickness: 100,
                  minBarLength: 0,

                  data: [this.timePerMonth[0].time, this.timePerMonth[1].time, this.timePerMonth[2].time, this.timePerMonth[3].time
                    , this.timePerMonth[4].time, this.timePerMonth[5].time, this.timePerMonth[6].time, this.timePerMonth[7].time, this.timePerMonth[8].time
                    , this.timePerMonth[9].time, this.timePerMonth[10].time, this.timePerMonth[11].time, this.timePerMonth[12].time, this.timePerMonth[13].time,
                  this.timePerMonth[14].time, this.timePerMonth[15].time, this.timePerMonth[16].time, this.timePerMonth[17].time, this.timePerMonth[18].time,
                  this.timePerMonth[19].time, this.timePerMonth[20].time, this.timePerMonth[21].time, this.timePerMonth[22].time,
                  this.timePerMonth[23].time, this.timePerMonth[24].time, this.timePerMonth[25].time, this.timePerMonth[26].time,
                  this.timePerMonth[27].time],
                  label: this.selectedSubject
                }]

              }
            } else if (numberOfMonth <= 7) {
              if (this.isOdd(numberOfMonth) === true) {

                console.log("not leap data");
                this.barChartLabels = [this.timePerMonth[0].date, this.timePerMonth[1].date, this.timePerMonth[2].date, this.timePerMonth[3].date
                  , this.timePerMonth[4].date, this.timePerMonth[5].date, this.timePerMonth[6].date, this.timePerMonth[7].date, this.timePerMonth[8].date
                  , this.timePerMonth[9].date, this.timePerMonth[10].date, this.timePerMonth[11].date, this.timePerMonth[12].date, this.timePerMonth[13].date,
                this.timePerMonth[14].date, this.timePerMonth[15].date, this.timePerMonth[16].date, this.timePerMonth[17].date, this.timePerMonth[18].date,
                this.timePerMonth[19].date, this.timePerMonth[20].date, this.timePerMonth[21].date, this.timePerMonth[22].date,
                this.timePerMonth[23].date, this.timePerMonth[24].date, this.timePerMonth[25].date, this.timePerMonth[26].date,
                this.timePerMonth[27].date, this.timePerMonth[28].date, this.timePerMonth[29].date, this.timePerMonth[30].date];

                this.barChartData = [{
                  barPercentage: 0.9,
                  barThickness: 14,
                  maxBarThickness: 100,
                  minBarLength: 0,

                  data: [this.timePerMonth[0].time, this.timePerMonth[1].time, this.timePerMonth[2].time, this.timePerMonth[3].time
                    , this.timePerMonth[4].time, this.timePerMonth[5].time, this.timePerMonth[6].time, this.timePerMonth[7].time, this.timePerMonth[8].time
                    , this.timePerMonth[9].time, this.timePerMonth[10].time, this.timePerMonth[11].time, this.timePerMonth[12].time, this.timePerMonth[13].time,
                  this.timePerMonth[14].time, this.timePerMonth[15].time, this.timePerMonth[16].time, this.timePerMonth[17].time, this.timePerMonth[18].time,
                  this.timePerMonth[19].time, this.timePerMonth[20].time, this.timePerMonth[21].time, this.timePerMonth[22].time,
                  this.timePerMonth[23].time, this.timePerMonth[24].time, this.timePerMonth[25].time, this.timePerMonth[26].time,
                  this.timePerMonth[27].time, this.timePerMonth[28].time, this.timePerMonth[29].time, this.timePerMonth[30].time],
                  label: this.selectedSubject
                }]

              } else {
                console.log("not leap data");
                this.barChartLabels = [this.timePerMonth[0].date, this.timePerMonth[1].date, this.timePerMonth[2].date, this.timePerMonth[3].date
                  , this.timePerMonth[4].date, this.timePerMonth[5].date, this.timePerMonth[6].date, this.timePerMonth[7].date, this.timePerMonth[8].date
                  , this.timePerMonth[9].date, this.timePerMonth[10].date, this.timePerMonth[11].date, this.timePerMonth[12].date, this.timePerMonth[13].date,
                this.timePerMonth[14].date, this.timePerMonth[15].date, this.timePerMonth[16].date, this.timePerMonth[17].date, this.timePerMonth[18].date,
                this.timePerMonth[19].date, this.timePerMonth[20].date, this.timePerMonth[21].date, this.timePerMonth[22].date,
                this.timePerMonth[23].date, this.timePerMonth[24].date, this.timePerMonth[25].date, this.timePerMonth[26].date,
                this.timePerMonth[27].date, this.timePerMonth[28].date, this.timePerMonth[29].date];

                this.barChartData = [{
                  barPercentage: 0.9,
                  barThickness: 14,
                  maxBarThickness: 100,
                  minBarLength: 0,

                  data: [this.timePerMonth[0].time, this.timePerMonth[1].time, this.timePerMonth[2].time, this.timePerMonth[3].time
                    , this.timePerMonth[4].time, this.timePerMonth[5].time, this.timePerMonth[6].time, this.timePerMonth[7].time, this.timePerMonth[8].time
                    , this.timePerMonth[9].time, this.timePerMonth[10].time, this.timePerMonth[11].time, this.timePerMonth[12].time, this.timePerMonth[13].time,
                  this.timePerMonth[14].time, this.timePerMonth[15].time, this.timePerMonth[16].time, this.timePerMonth[17].time, this.timePerMonth[18].time,
                  this.timePerMonth[19].time, this.timePerMonth[20].time, this.timePerMonth[21].time, this.timePerMonth[22].time,
                  this.timePerMonth[23].time, this.timePerMonth[24].time, this.timePerMonth[25].time, this.timePerMonth[26].time,
                  this.timePerMonth[27].time, this.timePerMonth[28].time, this.timePerMonth[29].time],
                  label: this.selectedSubject
                }]
              }


            } else {

              if (this.isEven(numberOfMonth)) {
                console.log("not leap data");
                this.barChartLabels = [this.timePerMonth[0].date, this.timePerMonth[1].date, this.timePerMonth[2].date, this.timePerMonth[3].date
                  , this.timePerMonth[4].date, this.timePerMonth[5].date, this.timePerMonth[6].date, this.timePerMonth[7].date, this.timePerMonth[8].date
                  , this.timePerMonth[9].date, this.timePerMonth[10].date, this.timePerMonth[11].date, this.timePerMonth[12].date, this.timePerMonth[13].date,
                this.timePerMonth[14].date, this.timePerMonth[15].date, this.timePerMonth[16].date, this.timePerMonth[17].date, this.timePerMonth[18].date,
                this.timePerMonth[19].date, this.timePerMonth[20].date, this.timePerMonth[21].date, this.timePerMonth[22].date,
                this.timePerMonth[23].date, this.timePerMonth[24].date, this.timePerMonth[25].date, this.timePerMonth[26].date,
                this.timePerMonth[27].date, this.timePerMonth[28].date, this.timePerMonth[29].date, this.timePerMonth[30].date];

                this.barChartData = [{
                  barPercentage: 0.9,
                  barThickness: 14,
                  maxBarThickness: 100,
                  minBarLength: 0,

                  data: [this.timePerMonth[0].time, this.timePerMonth[1].time, this.timePerMonth[2].time, this.timePerMonth[3].time
                    , this.timePerMonth[4].time, this.timePerMonth[5].time, this.timePerMonth[6].time, this.timePerMonth[7].time, this.timePerMonth[8].time
                    , this.timePerMonth[9].time, this.timePerMonth[10].time, this.timePerMonth[11].time, this.timePerMonth[12].time, this.timePerMonth[13].time,
                  this.timePerMonth[14].time, this.timePerMonth[15].time, this.timePerMonth[16].time, this.timePerMonth[17].time, this.timePerMonth[18].time,
                  this.timePerMonth[19].time, this.timePerMonth[20].time, this.timePerMonth[21].time, this.timePerMonth[22].time,
                  this.timePerMonth[23].time, this.timePerMonth[24].time, this.timePerMonth[25].time, this.timePerMonth[26].time,
                  this.timePerMonth[27].time, this.timePerMonth[28].time, this.timePerMonth[29].time, this.timePerMonth[30].time],
                  label: this.selectedSubject
                }]
              } else {

                console.log("not leap data");
                this.barChartLabels = [this.timePerMonth[0].date, this.timePerMonth[1].date, this.timePerMonth[2].date, this.timePerMonth[3].date
                  , this.timePerMonth[4].date, this.timePerMonth[5].date, this.timePerMonth[6].date, this.timePerMonth[7].date, this.timePerMonth[8].date
                  , this.timePerMonth[9].date, this.timePerMonth[10].date, this.timePerMonth[11].date, this.timePerMonth[12].date, this.timePerMonth[13].date,
                this.timePerMonth[14].date, this.timePerMonth[15].date, this.timePerMonth[16].date, this.timePerMonth[17].date, this.timePerMonth[18].date,
                this.timePerMonth[19].date, this.timePerMonth[20].date, this.timePerMonth[21].date, this.timePerMonth[22].date,
                this.timePerMonth[23].date, this.timePerMonth[24].date, this.timePerMonth[25].date, this.timePerMonth[26].date,
                this.timePerMonth[27].date, this.timePerMonth[28].date, this.timePerMonth[29].date];

                this.barChartData = [{
                  barPercentage: 0.9,
                  barThickness: 14,
                  maxBarThickness: 100,
                  minBarLength: 0,

                  data: [this.timePerMonth[0].time, this.timePerMonth[1].time, this.timePerMonth[2].time, this.timePerMonth[3].time
                    , this.timePerMonth[4].time, this.timePerMonth[5].time, this.timePerMonth[6].time, this.timePerMonth[7].time, this.timePerMonth[8].time
                    , this.timePerMonth[9].time, this.timePerMonth[10].time, this.timePerMonth[11].time, this.timePerMonth[12].time, this.timePerMonth[13].time,
                  this.timePerMonth[14].time, this.timePerMonth[15].time, this.timePerMonth[16].time, this.timePerMonth[17].time, this.timePerMonth[18].time,
                  this.timePerMonth[19].time, this.timePerMonth[20].time, this.timePerMonth[21].time, this.timePerMonth[22].time,
                  this.timePerMonth[23].time, this.timePerMonth[24].time, this.timePerMonth[25].time, this.timePerMonth[26].time,
                  this.timePerMonth[27].time, this.timePerMonth[28].time, this.timePerMonth[29].time],
                  label: this.selectedSubject
                }]

              }

            }

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

      let dateToSearch: Charts = {
        educationStage: this.selectedEducationStage,
        name: this.selectedName,
        actualYear: this.selectedYear,
        subject: this.selectedSubject,
        date: this.dateS,
        time: 0.0
      }

      this.chartService.postDateByYearPreviousS(dateToSearch).subscribe(
        res => {
          this.timePerMonth = res;
          console.log(this.timePerMonth[0].date);
          console.log(this.timePerMonth[0].time);
          this.dateS = this.timePerMonth[0].date

          setTimeout(() => {
            console.log("glowna funkcja" + this.timePerMonth[0].date);
            this.barChartLabels = [this.timePerMonth[0].date, this.timePerMonth[1].date, this.timePerMonth[2].date, this.timePerMonth[3].date
              , this.timePerMonth[4].date, this.timePerMonth[5].date, this.timePerMonth[6].date, this.timePerMonth[7].date, this.timePerMonth[8].date
              , this.timePerMonth[9].date, this.timePerMonth[10].date, this.timePerMonth[11].date];
            this.barChartData = [{
              barPercentage: 0.9,
              barThickness: 25,
              maxBarThickness: 100,
              minBarLength: 0,
              data: [this.timePerMonth[0].time, this.timePerMonth[1].time, this.timePerMonth[2].time, this.timePerMonth[3].time, this.timePerMonth[4].time
                , this.timePerMonth[5].time, this.timePerMonth[6].time, this.timePerMonth[7].time, this.timePerMonth[8].time, this.timePerMonth[9].time
                , this.timePerMonth[10].time, this.timePerMonth[11].time],
              label: this.selectedSubject
            }]
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


      let dateToSearch: Charts = {
        educationStage: this.selectedEducationStage,
        name: this.selectedName,
        actualYear: this.selectedYear,
        subject: this.selectedSubject,
        date: this.dateS,
        time: 0.0
      }

      this.chartService.postDateByDayNextS(dateToSearch).subscribe(
        res => {
          this.timePerDayA = res;
          this.dateS = res[0].date;

          setTimeout(() => {
            this.barChartLabels = [this.timePerDayA[0].date];
            this.barChartData = [{
              barPercentage: 0.9,
              barThickness: 80,
              maxBarThickness: 1000,
              minBarLength: 0,
              data: [this.timePerDayA[0].time],
              label: this.selectedSubject
            }]
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

      let dateToSearch: Charts = {
        educationStage: this.selectedEducationStage,
        name: this.selectedName,
        actualYear: this.selectedYear,
        subject: this.selectedSubject,
        date: this.dateS,
        time: 0.0
      }

      this.chartService.postDateByWeekNext(dateToSearch).subscribe(
        res => {
          this.timePerWeek = res;
          this.dateS = res[0].date;

          setTimeout(() => {
            console.log(this.timePerWeek[0].date);
            this.barChartLabels = [this.timePerWeek[0].date, this.timePerWeek[1].date, this.timePerWeek[2].date, this.timePerWeek[3].date,
            this.timePerWeek[4].date, this.timePerWeek[5].date, this.timePerWeek[6].date];
            this.barChartData = [{
              barPercentage: 0.9,
              barThickness: 40,
              maxBarThickness: 1000,
              minBarLength: 0,
              data: [this.timePerWeek[0].time, this.timePerWeek[1].time, this.timePerWeek[2].time, this.timePerWeek[3].time, this.timePerWeek[4].time,
              this.timePerWeek[5].time, this.timePerWeek[6].time],
              label: this.selectedSubject
            }]
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

      let dateToSearch: Charts = {
        educationStage: this.selectedEducationStage,
        name: this.selectedName,
        actualYear: this.selectedYear,
        subject: this.selectedSubject,
        date: this.dateS,
        time: 0.0
      }

      this.chartService.postDateByMonthNextS(dateToSearch).subscribe(
        res => {
          this.timePerMonth = res;
          console.log(res[0].date)
          this.dateS = res[0].date;

          setTimeout(() => {
            let numberOfMonth: number = this.getMonthShort(this.dateS);
            console.log(numberOfMonth)
            if (numberOfMonth === 2) {
              console.log(this.timePerMonth[0].date.substring(0, 4))
              let year = Number(this.timePerMonth[0].date.substring(0, 4));
              console.log("yera: to leap :  " + year)
              if (this.isLeapYear(year) === true) {


                console.log("leap data");
                this.barChartLabels = [this.timePerMonth[0].date, this.timePerMonth[1].date, this.timePerMonth[2].date, this.timePerMonth[3].date
                  , this.timePerMonth[4].date, this.timePerMonth[5].date, this.timePerMonth[6].date, this.timePerMonth[7].date, this.timePerMonth[8].date
                  , this.timePerMonth[9].date, this.timePerMonth[10].date, this.timePerMonth[11].date, this.timePerMonth[12].date, this.timePerMonth[13].date,
                this.timePerMonth[14].date, this.timePerMonth[15].date, this.timePerMonth[16].date, this.timePerMonth[17].date, this.timePerMonth[18].date,
                this.timePerMonth[19].date, this.timePerMonth[20].date, this.timePerMonth[21].date, this.timePerMonth[22].date,
                this.timePerMonth[23].date, this.timePerMonth[24].date, this.timePerMonth[25].date, this.timePerMonth[26].date,
                this.timePerMonth[27].date, this.timePerMonth[28].date];

                this.barChartData = [{
                  barPercentage: 0.9,
                  barThickness: 14,
                  maxBarThickness: 100,
                  minBarLength: 0,

                  data: [this.timePerMonth[0].time, this.timePerMonth[1].time, this.timePerMonth[2].time, this.timePerMonth[3].time
                    , this.timePerMonth[4].time, this.timePerMonth[5].time, this.timePerMonth[6].time, this.timePerMonth[7].time, this.timePerMonth[8].time
                    , this.timePerMonth[9].time, this.timePerMonth[10].time, this.timePerMonth[11].time, this.timePerMonth[12].time, this.timePerMonth[13].time,
                  this.timePerMonth[14].time, this.timePerMonth[15].time, this.timePerMonth[16].time, this.timePerMonth[17].time, this.timePerMonth[18].time,
                  this.timePerMonth[19].time, this.timePerMonth[20].time, this.timePerMonth[21].time, this.timePerMonth[22].time,
                  this.timePerMonth[23].time, this.timePerMonth[24].time, this.timePerMonth[25].time, this.timePerMonth[26].time,
                  this.timePerMonth[27].time, this.timePerMonth[28].time],
                  label: this.selectedSubject
                }]


              } else {

                console.log("not leap data");
                this.barChartLabels = [this.timePerMonth[0].date, this.timePerMonth[1].date, this.timePerMonth[2].date, this.timePerMonth[3].date
                  , this.timePerMonth[4].date, this.timePerMonth[5].date, this.timePerMonth[6].date, this.timePerMonth[7].date, this.timePerMonth[8].date
                  , this.timePerMonth[9].date, this.timePerMonth[10].date, this.timePerMonth[11].date, this.timePerMonth[12].date, this.timePerMonth[13].date,
                this.timePerMonth[14].date, this.timePerMonth[15].date, this.timePerMonth[16].date, this.timePerMonth[17].date, this.timePerMonth[18].date,
                this.timePerMonth[19].date, this.timePerMonth[20].date, this.timePerMonth[21].date, this.timePerMonth[22].date,
                this.timePerMonth[23].date, this.timePerMonth[24].date, this.timePerMonth[25].date, this.timePerMonth[26].date,
                this.timePerMonth[27].date];

                this.barChartData = [{
                  barPercentage: 0.9,
                  barThickness: 14,
                  maxBarThickness: 100,
                  minBarLength: 0,

                  data: [this.timePerMonth[0].time, this.timePerMonth[1].time, this.timePerMonth[2].time, this.timePerMonth[3].time
                    , this.timePerMonth[4].time, this.timePerMonth[5].time, this.timePerMonth[6].time, this.timePerMonth[7].time, this.timePerMonth[8].time
                    , this.timePerMonth[9].time, this.timePerMonth[10].time, this.timePerMonth[11].time, this.timePerMonth[12].time, this.timePerMonth[13].time,
                  this.timePerMonth[14].time, this.timePerMonth[15].time, this.timePerMonth[16].time, this.timePerMonth[17].time, this.timePerMonth[18].time,
                  this.timePerMonth[19].time, this.timePerMonth[20].time, this.timePerMonth[21].time, this.timePerMonth[22].time,
                  this.timePerMonth[23].time, this.timePerMonth[24].time, this.timePerMonth[25].time, this.timePerMonth[26].time,
                  this.timePerMonth[27].time],
                  label: this.selectedSubject
                }]

              }
            } else if (numberOfMonth <= 7) {
              if (this.isOdd(numberOfMonth) === true) {

                console.log("not leap data");
                this.barChartLabels = [this.timePerMonth[0].date, this.timePerMonth[1].date, this.timePerMonth[2].date, this.timePerMonth[3].date
                  , this.timePerMonth[4].date, this.timePerMonth[5].date, this.timePerMonth[6].date, this.timePerMonth[7].date, this.timePerMonth[8].date
                  , this.timePerMonth[9].date, this.timePerMonth[10].date, this.timePerMonth[11].date, this.timePerMonth[12].date, this.timePerMonth[13].date,
                this.timePerMonth[14].date, this.timePerMonth[15].date, this.timePerMonth[16].date, this.timePerMonth[17].date, this.timePerMonth[18].date,
                this.timePerMonth[19].date, this.timePerMonth[20].date, this.timePerMonth[21].date, this.timePerMonth[22].date,
                this.timePerMonth[23].date, this.timePerMonth[24].date, this.timePerMonth[25].date, this.timePerMonth[26].date,
                this.timePerMonth[27].date, this.timePerMonth[28].date, this.timePerMonth[29].date, this.timePerMonth[30].date];

                this.barChartData = [{
                  barPercentage: 0.9,
                  barThickness: 14,
                  maxBarThickness: 100,
                  minBarLength: 0,

                  data: [this.timePerMonth[0].time, this.timePerMonth[1].time, this.timePerMonth[2].time, this.timePerMonth[3].time
                    , this.timePerMonth[4].time, this.timePerMonth[5].time, this.timePerMonth[6].time, this.timePerMonth[7].time, this.timePerMonth[8].time
                    , this.timePerMonth[9].time, this.timePerMonth[10].time, this.timePerMonth[11].time, this.timePerMonth[12].time, this.timePerMonth[13].time,
                  this.timePerMonth[14].time, this.timePerMonth[15].time, this.timePerMonth[16].time, this.timePerMonth[17].time, this.timePerMonth[18].time,
                  this.timePerMonth[19].time, this.timePerMonth[20].time, this.timePerMonth[21].time, this.timePerMonth[22].time,
                  this.timePerMonth[23].time, this.timePerMonth[24].time, this.timePerMonth[25].time, this.timePerMonth[26].time,
                  this.timePerMonth[27].time, this.timePerMonth[28].time, this.timePerMonth[29].time, this.timePerMonth[30].time],
                  label: this.selectedSubject
                }]

              } else {
                console.log("not leap data");
                this.barChartLabels = [this.timePerMonth[0].date, this.timePerMonth[1].date, this.timePerMonth[2].date, this.timePerMonth[3].date
                  , this.timePerMonth[4].date, this.timePerMonth[5].date, this.timePerMonth[6].date, this.timePerMonth[7].date, this.timePerMonth[8].date
                  , this.timePerMonth[9].date, this.timePerMonth[10].date, this.timePerMonth[11].date, this.timePerMonth[12].date, this.timePerMonth[13].date,
                this.timePerMonth[14].date, this.timePerMonth[15].date, this.timePerMonth[16].date, this.timePerMonth[17].date, this.timePerMonth[18].date,
                this.timePerMonth[19].date, this.timePerMonth[20].date, this.timePerMonth[21].date, this.timePerMonth[22].date,
                this.timePerMonth[23].date, this.timePerMonth[24].date, this.timePerMonth[25].date, this.timePerMonth[26].date,
                this.timePerMonth[27].date, this.timePerMonth[28].date, this.timePerMonth[29].date];

                this.barChartData = [{
                  barPercentage: 0.9,
                  barThickness: 14,
                  maxBarThickness: 100,
                  minBarLength: 0,

                  data: [this.timePerMonth[0].time, this.timePerMonth[1].time, this.timePerMonth[2].time, this.timePerMonth[3].time
                    , this.timePerMonth[4].time, this.timePerMonth[5].time, this.timePerMonth[6].time, this.timePerMonth[7].time, this.timePerMonth[8].time
                    , this.timePerMonth[9].time, this.timePerMonth[10].time, this.timePerMonth[11].time, this.timePerMonth[12].time, this.timePerMonth[13].time,
                  this.timePerMonth[14].time, this.timePerMonth[15].time, this.timePerMonth[16].time, this.timePerMonth[17].time, this.timePerMonth[18].time,
                  this.timePerMonth[19].time, this.timePerMonth[20].time, this.timePerMonth[21].time, this.timePerMonth[22].time,
                  this.timePerMonth[23].time, this.timePerMonth[24].time, this.timePerMonth[25].time, this.timePerMonth[26].time,
                  this.timePerMonth[27].time, this.timePerMonth[28].time, this.timePerMonth[29].time],
                  label: this.selectedSubject
                }]
              }

            } else {

              if (this.isEven(numberOfMonth)) {
                console.log("not leap data");
                this.barChartLabels = [this.timePerMonth[0].date, this.timePerMonth[1].date, this.timePerMonth[2].date, this.timePerMonth[3].date
                  , this.timePerMonth[4].date, this.timePerMonth[5].date, this.timePerMonth[6].date, this.timePerMonth[7].date, this.timePerMonth[8].date
                  , this.timePerMonth[9].date, this.timePerMonth[10].date, this.timePerMonth[11].date, this.timePerMonth[12].date, this.timePerMonth[13].date,
                this.timePerMonth[14].date, this.timePerMonth[15].date, this.timePerMonth[16].date, this.timePerMonth[17].date, this.timePerMonth[18].date,
                this.timePerMonth[19].date, this.timePerMonth[20].date, this.timePerMonth[21].date, this.timePerMonth[22].date,
                this.timePerMonth[23].date, this.timePerMonth[24].date, this.timePerMonth[25].date, this.timePerMonth[26].date,
                this.timePerMonth[27].date, this.timePerMonth[28].date, this.timePerMonth[29].date, this.timePerMonth[30].date];

                this.barChartData = [{
                  barPercentage: 0.9,
                  barThickness: 14,
                  maxBarThickness: 100,
                  minBarLength: 0,

                  data: [this.timePerMonth[0].time, this.timePerMonth[1].time, this.timePerMonth[2].time, this.timePerMonth[3].time
                    , this.timePerMonth[4].time, this.timePerMonth[5].time, this.timePerMonth[6].time, this.timePerMonth[7].time, this.timePerMonth[8].time
                    , this.timePerMonth[9].time, this.timePerMonth[10].time, this.timePerMonth[11].time, this.timePerMonth[12].time, this.timePerMonth[13].time,
                  this.timePerMonth[14].time, this.timePerMonth[15].time, this.timePerMonth[16].time, this.timePerMonth[17].time, this.timePerMonth[18].time,
                  this.timePerMonth[19].time, this.timePerMonth[20].time, this.timePerMonth[21].time, this.timePerMonth[22].time,
                  this.timePerMonth[23].time, this.timePerMonth[24].time, this.timePerMonth[25].time, this.timePerMonth[26].time,
                  this.timePerMonth[27].time, this.timePerMonth[28].time, this.timePerMonth[29].time, this.timePerMonth[30].time],
                  label: this.selectedSubject
                }]
              } else {

                console.log("not leap data");
                this.barChartLabels = [this.timePerMonth[0].date, this.timePerMonth[1].date, this.timePerMonth[2].date, this.timePerMonth[3].date
                  , this.timePerMonth[4].date, this.timePerMonth[5].date, this.timePerMonth[6].date, this.timePerMonth[7].date, this.timePerMonth[8].date
                  , this.timePerMonth[9].date, this.timePerMonth[10].date, this.timePerMonth[11].date, this.timePerMonth[12].date, this.timePerMonth[13].date,
                this.timePerMonth[14].date, this.timePerMonth[15].date, this.timePerMonth[16].date, this.timePerMonth[17].date, this.timePerMonth[18].date,
                this.timePerMonth[19].date, this.timePerMonth[20].date, this.timePerMonth[21].date, this.timePerMonth[22].date,
                this.timePerMonth[23].date, this.timePerMonth[24].date, this.timePerMonth[25].date, this.timePerMonth[26].date,
                this.timePerMonth[27].date, this.timePerMonth[28].date, this.timePerMonth[29].date];

                this.barChartData = [{
                  barPercentage: 0.9,
                  barThickness: 14,
                  maxBarThickness: 100,
                  minBarLength: 0,

                  data: [this.timePerMonth[0].time, this.timePerMonth[1].time, this.timePerMonth[2].time, this.timePerMonth[3].time
                    , this.timePerMonth[4].time, this.timePerMonth[5].time, this.timePerMonth[6].time, this.timePerMonth[7].time, this.timePerMonth[8].time
                    , this.timePerMonth[9].time, this.timePerMonth[10].time, this.timePerMonth[11].time, this.timePerMonth[12].time, this.timePerMonth[13].time,
                  this.timePerMonth[14].time, this.timePerMonth[15].time, this.timePerMonth[16].time, this.timePerMonth[17].time, this.timePerMonth[18].time,
                  this.timePerMonth[19].time, this.timePerMonth[20].time, this.timePerMonth[21].time, this.timePerMonth[22].time,
                  this.timePerMonth[23].time, this.timePerMonth[24].time, this.timePerMonth[25].time, this.timePerMonth[26].time,
                  this.timePerMonth[27].time, this.timePerMonth[28].time, this.timePerMonth[29].time],
                  label: this.selectedSubject
                }]

              }

            }

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

      let dateToSearch: Charts = {
        educationStage: this.selectedEducationStage,
        name: this.selectedName,
        actualYear: this.selectedYear,
        subject: this.selectedSubject,
        date: this.dateS,
        time: 0.0
      }

      this.chartService.postDateByYearNextS(dateToSearch).subscribe(
        res => {
          this.timePerMonth = res;
          console.log(this.timePerMonth[0].date);
          console.log(this.timePerMonth[0].time);
          this.dateS = this.timePerMonth[0].date

          setTimeout(() => {
            console.log("glowna funkcja" + this.timePerMonth[0].date);
            this.barChartLabels = [this.timePerMonth[0].date, this.timePerMonth[1].date, this.timePerMonth[2].date, this.timePerMonth[3].date
              , this.timePerMonth[4].date, this.timePerMonth[5].date, this.timePerMonth[6].date, this.timePerMonth[7].date, this.timePerMonth[8].date
              , this.timePerMonth[9].date, this.timePerMonth[10].date, this.timePerMonth[11].date];
            this.barChartData = [{
              barPercentage: 0.9,
              barThickness: 25,
              maxBarThickness: 100,
              minBarLength: 0,
              data: [this.timePerMonth[0].time, this.timePerMonth[1].time, this.timePerMonth[2].time, this.timePerMonth[3].time, this.timePerMonth[4].time
                , this.timePerMonth[5].time, this.timePerMonth[6].time, this.timePerMonth[7].time, this.timePerMonth[8].time, this.timePerMonth[9].time
                , this.timePerMonth[10].time, this.timePerMonth[11].time],
              label: this.selectedSubject
            }]
          }, 400);
        },
        err => {
          this.serviceNotification.openSweetAlertError("You do not have any records assigned to given date!");
        }
      );
    }
  }

}
