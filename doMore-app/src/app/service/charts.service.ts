import { PieChart } from './../model/pieChart';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakForChart } from '../model/breakForChart';
import { Charts } from '../model/charts';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  private POST_CHARTS_BY_DAY_URL = "http://localhost:8082/charts/getByDay";
  private POST_CHARTS_BY_WEEK_URL = "http://localhost:8082/charts/getByWeek";
  private POST_CHARTS_BY_MONTH_URL = "http://localhost:8082/charts/getByMonth";
  private POST_CHARTS_BY_YEAR_URL = "http://localhost:8082/charts/getByYear";
  private POST_CHARTS_BY_DAY_PREVIOUS_URL = "http://localhost:8082/charts/getPreviousDate";
  private POST_CHARTS_BY_DAY_NEXT_URL = "http://localhost:8082/charts/getNextDate";
  private POST_CHARTS_BY_WEEK_PREVIOUS_URL = "http://localhost:8082/charts/getPreviousWeek";
  private POST_CHARTS_BY_WEEK_NEXT_URL = "http://localhost:8082/charts/getNextWeek";
  private POST_CHARTS_BY_MONTH_PREVIOUS_URL = "http://localhost:8082/charts/getPreviousMonth";
  private POST_CHARTS_BY_MONTH_NEXT_URL = "http://localhost:8082/charts/getNextMonth";
  private POST_CHARTS_BY_PREVIOUS_YEAR_URL = "http://localhost:8082/charts/getPreviousYear";
  private POST_CHARTS_BY_NEXT_YEAR_URL = "http://localhost:8082/charts/getNextYear";

  private POST_CHARTS_BY_DAY_SUBJECT_URL = "http://localhost:8082/charts/subject/getByDay";
  private POST_CHARTS_BY_WEEK_SUBJECT_URL = "http://localhost:8082/charts/subject/getByWeek";
  private POST_CHARTS_BY_MONTH_SUBJECT_URL = "http://localhost:8082/charts/subject/getByMonth";
  private POST_CHARTS_BY_YEAR_SUBJECT_URL = "http://localhost:8082/charts/subject/getByYear";
  private POST_CHARTS_BY_DAY_PREVIOUS_SUBJECT_URL = "http://localhost:8082/charts/subject/getPreviousDate";
  private POST_CHARTS_BY_DAY_NEXT_SUBJECT_URL = "http://localhost:8082/charts/subject/getNextDate";
  private POST_CHARTS_BY_WEEK_PREVIOUS_SUBJECT_URL = "http://localhost:8082/charts/subject/getPreviousWeek";
  private POST_CHARTS_BY_WEEK_NEXT_SUBJECT_URL = "http://localhost:8082/charts/subject/getNextWeek";
  private POST_CHARTS_BY_MONTH_PREVIOUS_SUBJECT_URL = "http://localhost:8082/charts/subject/getPreviousMonth";
  private POST_CHARTS_BY_MONTH_NEXT_SUBJECT_URL = "http://localhost:8082/charts/subject/getNextMonth";
  private POST_CHARTS_BY_PREVIOUS_YEAR_SUBJECT_URL = "http://localhost:8082/charts/subject/getPreviousYear";
  private POST_CHARTS_BY_NEXT_YEAR_SUBJECT_URL = "http://localhost:8082/charts/subject/getNextYear";

  private POST_CHARTS_BY_DAY_BREAK_URL = "http://localhost:8082/charts/break/getByDay";
  private POST_CHARTS_BY_WEEK_BREAK_URL = "http://localhost:8082/charts/break/getByWeek";
  private POST_CHARTS_BY_MONTH_BREAK_URL = "http://localhost:8082/charts/break/getByMonth";
  private POST_CHARTS_BY_YEAR_BREAK_URL = "http://localhost:8082/charts/break/getByYear";
  private POST_CHARTS_BY_DAY_PREVIOUS_BREAK_URL = "http://localhost:8082/charts/break/getPreviousDate";
  private POST_CHARTS_BY_DAY_NEXT_BREAK_URL = "http://localhost:8082/charts/break/getNextDate";
  private POST_CHARTS_BY_WEEK_PREVIOUS_BREAK_URL = "http://localhost:8082/charts/break/getPreviousWeek";
  private POST_CHARTS_BY_WEEK_NEXT_BREAK_URL = "http://localhost:8082/charts/break/getNextWeek";
  private POST_CHARTS_BY_MONTH_PREVIOUS_BREAK_URL = "http://localhost:8082/charts/break/getPreviousMonth";
  private POST_CHARTS_BY_MONTH_NEXT_BREAK_URL = "http://localhost:8082/charts/break/getNextMonth";
  private POST_CHARTS_BY_PREVIOUS_YEAR_BREAK_URL = "http://localhost:8082/charts/break/getPreviousYear";
  private POST_CHARTS_BY_NEXT_YEAR_BREAK_URL = "http://localhost:8082/charts/break/getNextYear";


  private POST_PIE_CHARTS_BY_DAY_URL = "http://localhost:8082/pieChart/getByDay";
  private POST_PIE_CHARTS_BY_WEEK_URL = "http://localhost:8082/pieChart/getByWeek";
  private POST_PIE_CHARTS_BY_MONTH_URL = "http://localhost:8082/pieChart/getByMonth";
  private POST_PIE_CHARTS_BY_YEAR_URL = "http://localhost:8082/pieChart/getByYear";
  private POST_PIE_CHARTS_BY_DAY_PREVIOUS_URL = "http://localhost:8082/pieChart/getPreviousDate";
  private POST_PIE_CHARTS_BY_DAY_NEXT_URL = "http://localhost:8082/pieChart/getNextDate";
  private POST_PIE_CHARTS_BY_WEEK_PREVIOUS_URL = "http://localhost:8082/pieChart/getPreviousWeek";
  private POST_PIE_CHARTS_BY_WEEK_NEXT_URL = "http://localhost:8082/pieChart/getNextWeek";
  private POST_PIE_CHARTS_BY_MONTH_PREVIOUS_URL = "http://localhost:8082/pieChart/getPreviousMonth";
  private POST_PIE_CHARTS_BY_MONTH_NEXT_URL = "http://localhost:8082/pieChart/getNextMonth";
  private POST_PIE_CHARTS_BY_PREVIOUS_YEAR_URL = "http://localhost:8082/pieChart/getPreviousYear";
  private POST_PIE_CHARTS_BY_NEXT_YEAR_URL = "http://localhost:8082/pieChart/getNextYear";

  private GET_DATE_BY_DAY_URL = "http://localhost:8082/pieChart/getDateByDay";
  private GET_DATE_FOR_WEEK_URL = "http://localhost:8082/pieChart/getDateByWeek";
  private GET_DATE_FOR_MONTH_URL = "http://localhost:8082/pieChart/getDateByMonth";
  private GET_DATE_FOR_YEAR_URL = "http://localhost:8082/pieChart/getDateByYear";



  constructor(private http: HttpClient) { }

  postDateByDay(charts: Charts): Observable<Charts> {
    return this.http.post<Charts>(this.POST_CHARTS_BY_DAY_URL, charts);
  }

  postDateByWeek(charts: Charts): Observable<Charts[]> {
    return this.http.post<Charts[]>(this.POST_CHARTS_BY_WEEK_URL, charts);
  }

  postDateByMonth(charts: Charts): Observable<Charts[]> {
    return this.http.post<Charts[]>(this.POST_CHARTS_BY_MONTH_URL, charts);
  }


  postDateByYear(charts: Charts): Observable<Charts[]> {
    return this.http.post<Charts[]>(this.POST_CHARTS_BY_YEAR_URL, charts);
  }

  postDateByDayPrevious(charts: Charts): Observable<Charts[]> {
    return this.http.post<Charts[]>(this.POST_CHARTS_BY_DAY_PREVIOUS_URL, charts);
  }

  postDateByDayNext(charts: Charts): Observable<Charts[]> {
    return this.http.post<Charts[]>(this.POST_CHARTS_BY_DAY_NEXT_URL, charts);
  }

  postDateByWeekPrevious(charts: Charts): Observable<Charts[]> {
    return this.http.post<Charts[]>(this.POST_CHARTS_BY_WEEK_PREVIOUS_URL, charts);
  }
  postDateByWeekNext(charts: Charts): Observable<Charts[]> {
    return this.http.post<Charts[]>(this.POST_CHARTS_BY_WEEK_NEXT_URL, charts);
  }

  postDateByMonthPrevious(charts: Charts): Observable<Charts[]> {
    return this.http.post<Charts[]>(this.POST_CHARTS_BY_MONTH_PREVIOUS_URL, charts);
  }
  postDateByMonthNext(charts: Charts): Observable<Charts[]> {
    return this.http.post<Charts[]>(this.POST_CHARTS_BY_MONTH_NEXT_URL, charts);
  }

  postDateByYearPrevious(charts: Charts): Observable<Charts[]> {
    return this.http.post<Charts[]>(this.POST_CHARTS_BY_PREVIOUS_YEAR_URL, charts);
  }
  postDateByYearNext(charts: Charts): Observable<Charts[]> {
    return this.http.post<Charts[]>(this.POST_CHARTS_BY_NEXT_YEAR_URL, charts);
  }










  postDateByDayS(charts: Charts): Observable<Charts> {
    return this.http.post<Charts>(this.POST_CHARTS_BY_DAY_SUBJECT_URL, charts);
  }

  postDateByWeekS(charts: Charts): Observable<Charts[]> {
    return this.http.post<Charts[]>(this.POST_CHARTS_BY_WEEK_SUBJECT_URL, charts);
  }

  postDateByMonthS(charts: Charts): Observable<Charts[]> {
    return this.http.post<Charts[]>(this.POST_CHARTS_BY_MONTH_SUBJECT_URL, charts);
  }

  postDateByYearS(charts: Charts): Observable<Charts[]> {
    return this.http.post<Charts[]>(this.POST_CHARTS_BY_YEAR_SUBJECT_URL, charts);
  }

  postDateByDayPreviousS(charts: Charts): Observable<Charts[]> {
    return this.http.post<Charts[]>(this.POST_CHARTS_BY_DAY_PREVIOUS_SUBJECT_URL, charts);
  }

  postDateByDayNextS(charts: Charts): Observable<Charts[]> {
    return this.http.post<Charts[]>(this.POST_CHARTS_BY_DAY_NEXT_SUBJECT_URL, charts);
  }

  postDateByWeekPreviousS(charts: Charts): Observable<Charts[]> {
    return this.http.post<Charts[]>(this.POST_CHARTS_BY_WEEK_PREVIOUS_SUBJECT_URL, charts);
  }

  postDateByWeekNextS(charts: Charts): Observable<Charts[]> {
    return this.http.post<Charts[]>(this.POST_CHARTS_BY_WEEK_NEXT_SUBJECT_URL, charts);
  }

  postDateByMonthPreviousS(charts: Charts): Observable<Charts[]> {
    return this.http.post<Charts[]>(this.POST_CHARTS_BY_MONTH_PREVIOUS_SUBJECT_URL, charts);
  }

  postDateByMonthNextS(charts: Charts): Observable<Charts[]> {
    return this.http.post<Charts[]>(this.POST_CHARTS_BY_MONTH_NEXT_SUBJECT_URL, charts);
  }

  postDateByYearPreviousS(charts: Charts): Observable<Charts[]> {
    return this.http.post<Charts[]>(this.POST_CHARTS_BY_PREVIOUS_YEAR_SUBJECT_URL, charts);
  }

  postDateByYearNextS(charts: Charts): Observable<Charts[]> {
    return this.http.post<Charts[]>(this.POST_CHARTS_BY_NEXT_YEAR_SUBJECT_URL, charts);
  }





  postDateByDayB(charts: BreakForChart): Observable<BreakForChart> {
    return this.http.post<BreakForChart>(this.POST_CHARTS_BY_DAY_BREAK_URL, charts);
  }


  postDateByWeekB(charts: BreakForChart): Observable<BreakForChart[]> {
    return this.http.post<BreakForChart[]>(this.POST_CHARTS_BY_WEEK_BREAK_URL, charts);
  }


  postDateByMonthB(charts: BreakForChart): Observable<BreakForChart[]> {
    return this.http.post<BreakForChart[]>(this.POST_CHARTS_BY_MONTH_BREAK_URL, charts);
  }


  postDateByYearB(charts: BreakForChart): Observable<BreakForChart[]> {
    return this.http.post<BreakForChart[]>(this.POST_CHARTS_BY_YEAR_BREAK_URL, charts);
  }


  postDateByDayPreviousB(charts: BreakForChart): Observable<BreakForChart[]> {
    return this.http.post<BreakForChart[]>(this.POST_CHARTS_BY_DAY_PREVIOUS_BREAK_URL, charts);
  }


  postDateByDayNextB(charts: BreakForChart): Observable<BreakForChart[]> {
    return this.http.post<BreakForChart[]>(this.POST_CHARTS_BY_DAY_NEXT_BREAK_URL, charts);
  }


  postDateByWeekPreviousB(charts: BreakForChart): Observable<BreakForChart[]> {
    return this.http.post<BreakForChart[]>(this.POST_CHARTS_BY_WEEK_PREVIOUS_BREAK_URL, charts);
  }


  postDateByWeekNextB(charts: BreakForChart): Observable<BreakForChart[]> {
    return this.http.post<BreakForChart[]>(this.POST_CHARTS_BY_WEEK_NEXT_BREAK_URL, charts);
  }



  postDateByMonthPreviousB(charts: BreakForChart): Observable<BreakForChart[]> {
    return this.http.post<BreakForChart[]>(this.POST_CHARTS_BY_MONTH_PREVIOUS_BREAK_URL, charts);
  }


  postDateByMonthNextB(charts: BreakForChart): Observable<BreakForChart[]> {
    return this.http.post<BreakForChart[]>(this.POST_CHARTS_BY_MONTH_NEXT_BREAK_URL, charts);
  }


  postDateByYearPreviousB(charts: BreakForChart): Observable<BreakForChart[]> {
    return this.http.post<BreakForChart[]>(this.POST_CHARTS_BY_PREVIOUS_YEAR_BREAK_URL, charts);
  }


  postDateByYearNextB(charts: BreakForChart): Observable<BreakForChart[]> {
    return this.http.post<BreakForChart[]>(this.POST_CHARTS_BY_NEXT_YEAR_BREAK_URL, charts);
  }







  postDateByDayP(charts: Charts): Observable<number[]> {
    return this.http.post<number[]>(this.POST_PIE_CHARTS_BY_DAY_URL, charts);
  }

  postDateByWeekP(charts: Charts): Observable<number[]> {
    return this.http.post<number[]>(this.POST_PIE_CHARTS_BY_WEEK_URL, charts);
  }

  postDateByMonthP(charts: Charts): Observable<number[]> {
    return this.http.post<number[]>(this.POST_PIE_CHARTS_BY_MONTH_URL, charts);
  }


  postDateByYearP(charts: Charts): Observable<number[]> {
    return this.http.post<number[]>(this.POST_PIE_CHARTS_BY_YEAR_URL, charts);
  }


  postDateByDayPreviousP(charts: PieChart): Observable<PieChart> {
    return this.http.post<PieChart>(this.POST_PIE_CHARTS_BY_DAY_PREVIOUS_URL, charts);
  }

  postDateByDayNextP(charts: PieChart): Observable<PieChart> {
    return this.http.post<PieChart>(this.POST_PIE_CHARTS_BY_DAY_NEXT_URL, charts);
  }


  postDateByWeekPreviousP(charts: PieChart): Observable<PieChart> {
    return this.http.post<PieChart>(this.POST_PIE_CHARTS_BY_WEEK_PREVIOUS_URL, charts);
  }
  postDateByWeekNextP(charts: PieChart): Observable<PieChart> {
    return this.http.post<PieChart>(this.POST_PIE_CHARTS_BY_WEEK_NEXT_URL, charts);
  }

  postDateByMonthPreviousP(charts: PieChart): Observable<PieChart> {
    return this.http.post<PieChart>(this.POST_PIE_CHARTS_BY_MONTH_PREVIOUS_URL, charts);
  }

  postDateByMonthNextP(charts: PieChart): Observable<PieChart> {
    return this.http.post<PieChart>(this.POST_PIE_CHARTS_BY_MONTH_NEXT_URL, charts);
  }

  postDateByYearPreviousP(charts: PieChart): Observable<PieChart> {
    return this.http.post<PieChart>(this.POST_PIE_CHARTS_BY_PREVIOUS_YEAR_URL, charts);
  }
  postDateByYearNextP(charts: PieChart): Observable<PieChart> {
    return this.http.post<PieChart>(this.POST_PIE_CHARTS_BY_NEXT_YEAR_URL, charts);
  }



  getDateByDay(charts: Charts): Observable<Charts> {
    return this.http.post<Charts>(this.GET_DATE_BY_DAY_URL, charts);
  }

  getDateForWeek(charts: Charts): Observable<Charts> {
    return this.http.post<Charts>(this.GET_DATE_FOR_WEEK_URL, charts);
  }

  getDateForMonth(charts: Charts): Observable<Charts> {
    return this.http.post<Charts>(this.GET_DATE_FOR_MONTH_URL, charts);
  }

  getDateForYear(charts: Charts): Observable<Charts> {
    return this.http.post<Charts>(this.GET_DATE_FOR_YEAR_URL, charts);
  }


}
