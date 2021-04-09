import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

private POST_USER_LOGIN_URL = "http://localhost:8082/login";
private POST_USER_REGISTRATION_URL = "http://localhost:8082/registration";
private GET_ALL_USERS_URL = "http://localhost:8082/getAllUsers";
private POST_IF_EXISTS_USERS_URL = "http://localhost:8082/ifExistUser";
private CHECK_PASSWORD_URL = "http://localhost:8082/checkPassword";
private LOGOUT_URL = "http://localhost:8082/logout";
private USER_URL = "http://localhost:8082/getUser";
private CHANGE_PASSWORD_URL = "http://localhost:8082/changePassword";
private CHANGE_DATA_ABOUT_USER_URL = "http://localhost:8082/changeDataAboutUser";

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.GET_ALL_USERS_URL);
  }

  logout(): Observable<User[]>{
    return this.http.get<User[]>(this.LOGOUT_URL);
  }

  getUser(): Observable<User>{
    return this.http.get<User>(this.USER_URL);
  }

  ifExistsUsers(user: User): Observable<User>{
    return this.http.post<User>(this.POST_IF_EXISTS_USERS_URL, user);
  }

  public loginUserFromRemote(user: User): Observable<any>{
    return this.http.post<any>(this.POST_USER_LOGIN_URL, user);
  }

  public checkUserCredentils(user: User): Observable<any>{
    return this.http.post<any>(this.CHECK_PASSWORD_URL, user);
  }

  public registerUserFromRemote(user: User): Observable<any>{
    return this.http.post<any>(this.POST_USER_REGISTRATION_URL, user);
  }

  public changePassword(user: User): Observable<any>{
    return this.http.post<any>(this.CHANGE_PASSWORD_URL, user);
  }

  public changeDataAboutUser(user: User): Observable<any>{
    return this.http.post<any>(this.CHANGE_DATA_ABOUT_USER_URL, user);
  }

}
