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

}
