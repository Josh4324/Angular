import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Scrumuser } from './scrumuser';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrumdataService {

  constructor(private http: HttpClient) {}

  url = 'https://liveapi.chatscrum.com/scrum/api/scrumusers/';
  loginurl = 'https://liveapi.chatscrum.com/scrum/api-token-auth/';
  _scrumProjectUrl = 'https://liveapi.chatscrum.com/scrum/api/scrumprojects/';
  _createProjectUrl = 'https://liveapi.chatscrum.com/scrum/api/scrumusers/'
  goalUrl = 'https://liveapi.chatscrum.com/scrum/api/scrumgoals/'
  updateRoleUrl = 'https://liveapi.chatscrum.com/scrum/api/scrumprojectroles/';
  addGoalUrl = 'https://liveapi.chatscrum.com/scrum/api/scrumgoals/';
  sprintUrl = 'https://liveapi.chatscrum.com/scrum/api/scrumsprint/';
  token;
  encode;


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };



   postUserData(scrumUser: Scrumuser): Observable<any> {
      return this.http.post(this.url, {'email':scrumUser['email'], 'password':scrumUser['password'], 'full_name': scrumUser['fullname'], 'usertype':scrumUser['type'], 'projname':scrumUser['projname'] } , this.httpOptions);
  }

  loginUser(user) {
    return this.http.post(this.loginurl, {'username' : user['email'], 'password' : user['password'], 'project' : user['projname']}, this.httpOptions);
  }

  updateUser(user): Observable<any> {
    this.token = this.getUser().token;
    this.encode = JSON.parse(localStorage.getItem('Auth'));
    this.encode = btoa(`${this.encode.email}:${this.encode.password}`);
    return this.http.patch(this.updateRoleUrl + user.id + '/', {role: user.role}, {headers: new HttpHeaders()
    .set('Authorization', `Basic ${this.encode}==`)})
  }

  updateStatus(user): Observable<any> {
    this.token = this.getUser().token;
    this.encode = JSON.parse(localStorage.getItem('Auth'));
    this.encode = btoa(`${this.encode.email}:${this.encode.password}`);
    return this.http.patch(this.goalUrl + user[4] + '/', {status: user[3]}, {headers: new HttpHeaders()
    .set('Authorization', `Basic ${this.encode}==`)})
  }

  addGoal(user): Observable<any> {
    this.token = this.getUser().token;
    this.encode = JSON.parse(localStorage.getItem('Auth'));
    this.encode = btoa(`${this.encode.email}:${this.encode.password}`);
    return this.http.post(this.addGoalUrl, {name: user.goalname, project_id: user.id, user:user.user}, {headers: new HttpHeaders()
    .set('Authorization', `Basic ${this.encode}==`)})
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  allProjectGoals(project_id) {
    return this.http.get<any>(this._scrumProjectUrl + project_id, this.httpOptions);
  }

  createProject(projuser) {
    return this.http.post(this._createProjectUrl, { 'email' : projuser['email'], 'full_name' : projuser['fullname'], 'password':'password', 'projname': projuser['projname'], 'usertype':'Owner', 'username':'josh'}, this.httpOptions);
  }


  createSprint(data): Observable<any> {
    this.token = this.getUser().token;
    this.encode = JSON.parse(localStorage.getItem('Auth'));
    this.encode = btoa(`${this.encode.email}:${this.encode.password}`);
    console.log(data.project_id)
    return this.http.post(this.sprintUrl + "?" + 'goal_project_id=' + data.project_id, { 'project_id': data.project_id}, {headers: new HttpHeaders()
    .set('Authorization', `Basic ${this.encode}==`).append('Content-Type', 'application/json')}, )
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user'))
  }


}


