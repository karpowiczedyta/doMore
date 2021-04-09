import { Break } from './../model/break';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CounterUpTimer } from '../model/counter-time-up';

@Injectable({
  providedIn: 'root'
})
export class CounterUpTimerService {


  private GET_ALL_EDUCATIONTAGES_URL = "http://localhost:8082/counterUpTimer/all";
  private POST_EDUCATIONSTAGE_URL =  "http://localhost:8082/counterUpTimer";
  private GET_ALL_EDUCATION_STAGES_DISTINCT_URL = "http://localhost:8082/counterUpTimer/all/educationStageDistinct";
  private GET_ALL_NAME_BY_EDUCATION_STAGE_DISTINCT_URL = "http://localhost:8082/counterUpTimer/all/nameByEducationStageDistinct";
  private GET_ALL_ACTUAR_YEAR_BY_EDUCATION_STAGE_AND_NAME_DISTINCT_URL = "http://localhost:8082/counterUpTimer/all/actualYearByEducationStageAndNameDistinct"
  private GET_ALL_SUBJECTS_BY_EDUCATION_STAGE_NAME_YEAR_URL="http://localhost:8082/counterUpTimer/all/subjectsByNameAndActualYearAndEducationStage"
  private UPDATE_COUNTER_UP_TIMER_URL = "http://localhost:8082/counterUpTimer/";
  private DELETE_COUNTER_UP_TIMER_URL = "http://localhost:8082/counterUpTimer/";
  private DELETE_ALL_COUNTER_UP_TIMER_URL = "http://localhost:8082/counterUpTimer";


  private GET_ALL_BREAKS_URL = "http://localhost:8082/break/all";
  private POST_BREAK_URL =  "http://localhost:8082/break";
  private DELETE_BREAK_URL = "http://localhost:8082/break/";
  private DELETE_ALL_BREAK_URL = "http://localhost:8082/break";


  constructor(private http: HttpClient) { }

  getAllCounterUpTimer(): Observable<CounterUpTimer[]>{
    return this.http.get<CounterUpTimer[]>(this.GET_ALL_EDUCATIONTAGES_URL);
  }

  postCounterUpTimer(counterUpTimer: CounterUpTimer):  Observable<CounterUpTimer>{
    return this.http.post<CounterUpTimer>(this.POST_EDUCATIONSTAGE_URL,counterUpTimer);
  }

  getAllEducationStageDistinct(): Observable<String[]>{
    return this.http.get<String[]>(this.GET_ALL_EDUCATION_STAGES_DISTINCT_URL);
  }

  postByEducationStage(educationStage: CounterUpTimer):  Observable<String[]>{
    return this.http.post<String[]>(this.GET_ALL_NAME_BY_EDUCATION_STAGE_DISTINCT_URL,educationStage);
  }

  postByEducationStageAndName(educationStageAndName: CounterUpTimer):  Observable<String[]>{
    return this.http.post<String[]>(this.GET_ALL_ACTUAR_YEAR_BY_EDUCATION_STAGE_AND_NAME_DISTINCT_URL,educationStageAndName);
  }

  postByEducationStageAndNameAndYear(educationStageAndNameAndYear: CounterUpTimer):  Observable<String[]>{
    return this.http.post<String[]>(this.GET_ALL_SUBJECTS_BY_EDUCATION_STAGE_NAME_YEAR_URL,educationStageAndNameAndYear);
  }

  postByEducationStageAndNameAndYearSM(educationStageAndNameAndYear: CounterUpTimer):  Observable<string[]>{
    return this.http.post<string[]>(this.GET_ALL_SUBJECTS_BY_EDUCATION_STAGE_NAME_YEAR_URL,educationStageAndNameAndYear);
  }

  patchCounterUpTimer(counterUpTimer: CounterUpTimer): Observable<any> {
    return this.http.patch(this.UPDATE_COUNTER_UP_TIMER_URL + counterUpTimer.id , counterUpTimer);
  }

  deleteCounterUpTimer(id: number): Observable<any>{
    return this.http.delete<CounterUpTimer>(this.DELETE_COUNTER_UP_TIMER_URL + id);
  }

  deleteAllCounterUpTimer(): Observable<any>{
    return this.http.delete<CounterUpTimer>(this.DELETE_ALL_COUNTER_UP_TIMER_URL);
  }





  getAllBreaks(): Observable<Break[]>{
    return this.http.get<Break[]>(this.GET_ALL_BREAKS_URL);
  }

  postBreak(breakk: Break):  Observable<Break>{
    return this.http.post<Break>(this.POST_BREAK_URL,breakk);
  }

  deleteBreak(id: number): Observable<any>{
    return this.http.delete<Break>(this.DELETE_BREAK_URL + id);
  }

  deleteAllBreak(): Observable<any>{
    return this.http.delete<Break>(this.DELETE_ALL_BREAK_URL);
  }


}
