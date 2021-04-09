import { Subject } from './../model/subject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EducationStage } from '../model/educationStage';

@Injectable({
  providedIn: 'root'
})
export class EducationStagesAndSubjectsService {

  private GET_ALL_EDUCATIONTAGES_URL = "http://localhost:8082/education-stages/all";
  private POST_EDUCATIONSTAGE_URL =  "http://localhost:8082/education-stages";
  private DELETE_EDUCATIONSTAGE_URL = "http://localhost:8082/education-stages/";
  private UPDATE_EDUCATIONSTAGE_URL = "http://localhost:8082/education-stages/";
  private GET_ALL_BY_EDUCATIONSTAGE_DISTINCT_URL = "http://localhost:8082/education-stages/all/educationStageDistinct";
  private GET_ALL_NAME_BY_EDUCATION_STAGE_DISTINCT_URL = "http://localhost:8082/education-stages/all/nameByEducationStageDistinct";
  private GET_ALL_ACTUAR_YEAR_BY_EDUCATION_STAGE_AND_NAME_DISTINCT_URL = "http://localhost:8082/education-stages/all/actualYearByEducationStageAndNameDistinct";
  private POST_EDUCATIONSTAGE_NAME_ACTUALYEAR_URL = "http://localhost:8082/education-stages/all/byNameAndActualYearAndEducationStage";
  private POST_SUBJECT_URL = "http://localhost:8082/subjects";
  private GET_ALL_SUBJECTS_BY_EDUCATIONSTAGE_URL = "http://localhost:8082/subjects/byEducationStage/";
  private DELETE_SUBJECT_URL = "http://localhost:8082/subjects/";
  private UPDATE_SUBJECT_URL = "http://localhost:8082/subjects/";
  private GET_ALL_SUBJECT_DISTINCT_BY_EDUCATION_STAGE_ID_URL = "http://localhost:8082/subjects/byEducationStageSubjectDistinct/";

  constructor(private http: HttpClient) { }

  getAllEducationStages(): Observable<EducationStage[]>{
    return this.http.get<EducationStage[]>(this.GET_ALL_EDUCATIONTAGES_URL);
  }

  postEducationStage(educationStage: EducationStage):  Observable<EducationStage>{
    return this.http.post<EducationStage>(this.POST_EDUCATIONSTAGE_URL,educationStage);
  }

  deleteEducationStage(id: number): Observable<any>{
    return this.http.delete<EducationStage>(this.DELETE_EDUCATIONSTAGE_URL + id);
  }

  patchEducationStage(educationStage: EducationStage): Observable<any> {
    return this.http.patch(this.UPDATE_EDUCATIONSTAGE_URL + educationStage.id , educationStage);
  }

  getAllEducationStageDistinct():Observable<String[]>{
    return this.http.get<String[]>(this.GET_ALL_BY_EDUCATIONSTAGE_DISTINCT_URL);
  }

  postByEducationStage(educationStage: EducationStage):  Observable<String[]>{
    return this.http.post<String[]>(this.GET_ALL_NAME_BY_EDUCATION_STAGE_DISTINCT_URL,educationStage);
  }

  postByEducationStageAndName(educationStage: EducationStage):  Observable<String[]>{
    return this.http.post<String[]>(this.GET_ALL_ACTUAR_YEAR_BY_EDUCATION_STAGE_AND_NAME_DISTINCT_URL,educationStage);
  }

  postByEducationStageAndNameAndYear(educationStage: EducationStage):  Observable<EducationStage>{
    return this.http.post<EducationStage>(this.POST_EDUCATIONSTAGE_NAME_ACTUALYEAR_URL,educationStage);
  }

  postSubject(subject: Subject):  Observable<Subject>{
    return this.http.post<Subject>(this.POST_SUBJECT_URL,subject);
  }

  getSubjectsByEducationStage(id: number): Observable<Subject[]>{
    return this.http.get<Subject[]>(this.GET_ALL_SUBJECTS_BY_EDUCATIONSTAGE_URL + id);
   }

   getSubjectsByEducationStageSubjectDistinct(id: number): Observable<string[]>{
    return this.http.get<string[]>(this.GET_ALL_SUBJECT_DISTINCT_BY_EDUCATION_STAGE_ID_URL + id);
   }

   deleteSubject(id: number): Observable<any>{
    return this.http.delete<Subject>(this.DELETE_SUBJECT_URL + id);
  }

  patchSubject(subject: Subject): Observable<any> {
    return this.http.patch(this.UPDATE_SUBJECT_URL + subject.id , subject);
  }


}
