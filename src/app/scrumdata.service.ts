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
  goalUrl = 'http://liveapi.chatscrum.com/scrum/api/scrumgoals/'

  
  token = localStorage.getItem('token');
  Auth = JSON.parse(localStorage.getItem('Auth'));
  encode = btoa(`${this.Auth.email}:${this.Auth.password}`);
 

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };



   postUserData(scrumUser: Scrumuser): Observable<any> {
      return this.http.post(this.url, {'email':scrumUser['email'], 'password':scrumUser['password'], 'full_name': scrumUser['fullname'], 'usertype':scrumUser['type'], 'projname':scrumUser['projname'] } , this.httpOptions);
  }

  loginUser(user) {
    return this.http.post(this.loginurl, {'username' : user['email'], 'password' : user['password'], 'project' : user['projname']}, this.httpOptions);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  allProjectGoals(project_id) {
    return this.http.get<any>(this._scrumProjectUrl + project_id, this.httpOptions);
  }

  createProject(projuser) {
    return this.http.post(this._scrumProjectUrl, { 'email' : projuser['email'], 'full_name' : projuser['fullname'], 'password':'password', 'projname': projuser['projname'], 'usertype':'Owner', 'username':'josh'}, this.httpOptions);
  }

  
  updateGoal(id,status) {
    return this.http.patch(this.goalUrl + id + '/', {'status' : status} , {headers: new HttpHeaders().set('Authorization', `Basic ${this.encode}==`)} );
  }
  

}


