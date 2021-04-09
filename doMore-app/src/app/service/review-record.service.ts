import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CounterUpTimer } from '../model/counter-time-up';
import { ReviewRecord } from '../model/reviewRecord';

@Injectable({
  providedIn: 'root'
})
export class ReviewRecordService {

  private GET_BY_DATE_URL = "http://localhost:8082/counterUpTimer/allByDate";
  private GET_BY_SUBJECT_URL = "http://localhost:8082/counterUpTimer/allBySubject";
  private GET_BY_START_TIME_URL = "http://localhost:8082/counterUpTimer/allByStartTime";
  private GET_BY_END_TIME_URL = "http://localhost:8082/counterUpTimer/allByEndTime";
  private GET_BY_SUBJECT_AND_START_TIME_AND_END_TIME_URL = "http://localhost:8082/counterUpTimer/allBySubjectAndStartTimeAndEndTime";
  private GET_BY_SUBJECT_AND_START_TIME_URL = "http://localhost:8082/counterUpTimer/allBySubjectAndStartTime";
  private GET_BY_SUBJECT_AND_END_TIME_URL = "http://localhost:8082/counterUpTimer/allBySubjectAndEndTime";
  private GET_BY_START_TIME_END_TIME_URL = "http://localhost:8082/counterUpTimer/allByStartTimeAndEndTime";
  private GET_SUMMARY_BY_DAY_URL = "http://localhost:8082/counterUpTimer/summaryByDay";
  private GET_SUMMARY_BY_DAY_AND_SUBJECT_URL = "http://localhost:8082/counterUpTimer/summaryByDayAndSubject";
  private GET_SUMMARY_BY_DAY_BREAK_URL = "http://localhost:8082/break/summaryByDay";

  constructor(private http: HttpClient) { }

  getByDate(reviewRecord: ReviewRecord): Observable<CounterUpTimer[]>{
    return this.http.post<CounterUpTimer[]>(this.GET_BY_DATE_URL,reviewRecord);
  }

  getBySubject(reviewRecord: ReviewRecord): Observable<CounterUpTimer[]>{
    return this.http.post<CounterUpTimer[]>(this.GET_BY_SUBJECT_URL,reviewRecord);
  }

  getByStartTime(reviewRecord: ReviewRecord): Observable<CounterUpTimer[]>{
    return this.http.post<CounterUpTimer[]>(this.GET_BY_START_TIME_URL,reviewRecord);
  }

  getByEndTime(reviewRecord: ReviewRecord): Observable<CounterUpTimer[]>{
    return this.http.post<CounterUpTimer[]>(this.GET_BY_END_TIME_URL,reviewRecord);
  }

  getBySubjectAndStartTimeAndEndTime(reviewRecord: ReviewRecord): Observable<CounterUpTimer[]>{
    return this.http.post<CounterUpTimer[]>(this.GET_BY_SUBJECT_AND_START_TIME_AND_END_TIME_URL,reviewRecord);
  }

  getBySubjectAndStartTime(reviewRecord: ReviewRecord): Observable<CounterUpTimer[]>{
    return this.http.post<CounterUpTimer[]>(this.GET_BY_SUBJECT_AND_START_TIME_URL,reviewRecord);
  }

  getBySubjectAndEndTime(reviewRecord: ReviewRecord): Observable<CounterUpTimer[]>{
    return this.http.post<CounterUpTimer[]>(this.GET_BY_SUBJECT_AND_END_TIME_URL,reviewRecord);
  }

  getByStartTimeAndEndTime(reviewRecord: ReviewRecord): Observable<CounterUpTimer[]>{
    return this.http.post<CounterUpTimer[]>(this.GET_BY_START_TIME_END_TIME_URL,reviewRecord);
  }

  getSummaryByDay(reviewRecord: ReviewRecord): Observable<ReviewRecord>{
    return this.http.post<ReviewRecord>(this.GET_SUMMARY_BY_DAY_URL,reviewRecord);
  }

  getSummaryByDayAndSubject(reviewRecord: ReviewRecord): Observable<ReviewRecord>{
    return this.http.post<ReviewRecord>(this.GET_SUMMARY_BY_DAY_AND_SUBJECT_URL,reviewRecord);
  }

  getSummaryByDayBreak(reviewRecord: ReviewRecord): Observable<ReviewRecord>{
    return this.http.post<ReviewRecord>(this.GET_SUMMARY_BY_DAY_BREAK_URL,reviewRecord);
  }

}
