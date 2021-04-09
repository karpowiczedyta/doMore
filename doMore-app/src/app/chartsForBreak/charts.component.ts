import { Component, OnInit } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { CounterUpTimer } from '../model/counter-time-up';
import { CounterUpTimerService } from '../service/counter-up-timer.service';
import { NotificationsAllService } from '../service/notifications.service';
import { ChartOptions, ChartType } from 'chart.js';
import { ChartsService } from '../service/charts.service';
import { Charts } from '../model/charts';
import { BreakForChart } from '../model/breakForChart';
import { Router } from '@angular/router';
import { RegistrationService } from '../service/registration.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
  providers: [{ provide: MatFormFieldControl, useExisting: MatFormFieldControl }]

})
export class ChartsForBreakComponent implements OnInit {

  date: string = "";
  dateS: string = "";

  timePerDay!: BreakForChart;
  timePerDayA: BreakForChart[] = [];
  timePerWeek: BreakForChart[] = [];
  timePerMonth: BreakForChart[] = [];

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
    , private chartService: ChartsService, private registration: RegistrationService,private router: Router) { }

  ngOnInit(): void {

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
    anchor.download = "summaryPerBreak.png";
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

    let dateToSearch: BreakForChart = {
      date: this.dateS,
      time: 0.0
    }

    this.chartService.postDateByDayB(dateToSearch).subscribe(
      res => {
        this.timePerDay = res;
        this.dateS = res.date;
      },
      err => {
        this.serviceNotification.openSweetAlertError("You do not have any records assigned to given date!");
      }
    );

    setTimeout(() => {

      this.barChartLabels = [this.timePerDay.date];
      this.barChartData = [{
        barPercentage: 0.9,
        barThickness: 80,
        maxBarThickness: 1000,
        minBarLength: 0,
        data: [this.timePerDay.time],
        label: 'Hours'
      }]

    }, 500);
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

    let dateToSearch: BreakForChart = {
      date: this.dateS,
      time: 0.0
    }

    this.chartService.postDateByWeekB(dateToSearch).subscribe(
      res => {
        this.timePerWeek = res;
      },
      err => {
        this.serviceNotification.openSweetAlertError("You do not have any records assigned to given date!");
      }
    );

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
        label: 'Hours'
      }]
    }, 500);
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

    let dateToSearch: BreakForChart = {
      date: this.dateS,
      time: 0.0
    }

    this.chartService.postDateByMonthB(dateToSearch).subscribe(
      res => {
        this.timePerMonth = res;
      },
      err => {
        this.serviceNotification.openSweetAlertError("You do not have any records assigned to given date!");
      }
    );

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
            label: 'Hours'
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
            label: 'Hours'
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
            label: 'Hours'
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
            label: 'Hours'
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
            label: 'Hours'
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
            label: 'Hours'
          }]

        }

      }

    }, 500);
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

    let dateToSearch: BreakForChart = {
      date: this.dateS,
      time: 0.0
    }

    this.chartService.postDateByYearB(dateToSearch).subscribe(
      res => {
        this.timePerMonth = res;
        console.log(this.timePerMonth[0].date);
        console.log(this.timePerMonth[0].time);
      },
      err => {
        this.serviceNotification.openSweetAlertError("You do not have any records assigned to given date!");
      }
    );

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
        label: 'Hours'
      }]
    }, 500);

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

      let dateToSearch: BreakForChart = {
        date: this.dateS,
        time: 0.0
      }

      this.chartService.postDateByDayPreviousB(dateToSearch).subscribe(
        res => {
          this.timePerDayA = res;
          this.dateS = res[0].date;
        },
        err => {
          this.serviceNotification.openSweetAlertError("You do not have any records assigned to given date!");
        }
      );

      setTimeout(() => {
        this.barChartLabels = [this.timePerDayA[0].date];
        this.barChartData = [{
          barPercentage: 0.9,
          barThickness: 80,
          maxBarThickness: 1000,
          minBarLength: 0,
          data: [this.timePerDayA[0].time],
          label: 'Hours'
        }]
      }, 400);

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

      let dateToSearch: BreakForChart = {
        date: this.dateS,
        time: 0.0
      }

      this.chartService.postDateByWeekPreviousB(dateToSearch).subscribe(
        res => {
          this.timePerWeek = res;
          this.dateS = res[0].date;
        },
        err => {
          this.serviceNotification.openSweetAlertError("You do not have any records assigned to given date!");
        }
      );

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
          label: 'Hours'
        }]
      }, 400);
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

      let dateToSearch: BreakForChart = {
        date: this.dateS,
        time: 0.0
      }

      this.chartService.postDateByMonthPreviousB(dateToSearch).subscribe(
        res => {
          this.timePerMonth = res;
          console.log(res[0].date)
          this.dateS = res[0].date;
        },
        err => {
          this.serviceNotification.openSweetAlertError("You do not have any records assigned to given date!");
        }
      );

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
              label: 'Hours'
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
              label: 'Hours'
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
              label: 'Hours'
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
              label: 'Hours'
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
              label: 'Hours'
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
              label: 'Hours'
            }]

          }

        }

      }, 400);

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

      let dateToSearch: BreakForChart = {
        date: this.dateS,
        time: 0.0
      }

      this.chartService.postDateByYearPreviousB(dateToSearch).subscribe(
        res => {
          this.timePerMonth = res;
          console.log(this.timePerMonth[0].date);
          console.log(this.timePerMonth[0].time);
          this.dateS = this.timePerMonth[0].date
        },
        err => {
          this.serviceNotification.openSweetAlertError("You do not have any records assigned to given date!");
        }
      );

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
          label: 'Hours'
        }]
      }, 400);
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


      let dateToSearch: BreakForChart = {
        date: this.dateS,
        time: 0.0
      }

      this.chartService.postDateByDayNextB(dateToSearch).subscribe(
        res => {
          this.timePerDayA = res;
          this.dateS = res[0].date;
        },
        err => {
          this.serviceNotification.openSweetAlertError("You do not have any records assigned to given date!");
        }
      );

      setTimeout(() => {
        this.barChartLabels = [this.timePerDayA[0].date];
        this.barChartData = [{
          barPercentage: 0.9,
          barThickness: 80,
          maxBarThickness: 1000,
          minBarLength: 0,
          data: [this.timePerDayA[0].time],
          label: 'Hours'
        }]
      }, 400);

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

      let dateToSearch: BreakForChart = {
        date: this.dateS,
        time: 0.0
      }

      this.chartService.postDateByWeekNextB(dateToSearch).subscribe(
        res => {
          this.timePerWeek = res;
          this.dateS = res[0].date;
        },
        err => {
          this.serviceNotification.openSweetAlertError("You do not have any records assigned to given date!");
        }
      );

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
          label: 'Hours'
        }]
      }, 400);

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

      let dateToSearch: BreakForChart = {
        date: this.dateS,
        time: 0.0
      }

      this.chartService.postDateByMonthNextB(dateToSearch).subscribe(
        res => {
          this.timePerMonth = res;
          console.log(res[0].date)
          this.dateS = res[0].date;
        },
        err => {
          this.serviceNotification.openSweetAlertError("You do not have any records assigned to given date!");
        }
      );

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
              label: 'Hours'
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
              label: 'Hours'
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
              label: 'Hours'
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
              label: 'Hours'
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
              label: 'Hours'
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
              label: 'Hours'
            }]

          }

        }

      }, 400);

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

      let dateToSearch: BreakForChart = {
        date: this.dateS,
        time: 0.0
      }

      this.chartService.postDateByYearNextB(dateToSearch).subscribe(
        res => {
          this.timePerMonth = res;
          console.log(this.timePerMonth[0].date);
          console.log(this.timePerMonth[0].time);
          this.dateS = this.timePerMonth[0].date
        },
        err => {
          this.serviceNotification.openSweetAlertError("You do not have any records assigned to given date!");
        }
      );

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
          label: 'Hours'
        }]
      }, 400);

    }
  }

}
