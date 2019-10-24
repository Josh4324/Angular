import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {LoginData} from '../loginData';
import { ScrumdataService } from '../scrumdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  scrumUserLoginData = {
      email: null,
      password: null,
      projname: '',
  };

  Response = '';

  constructor(private Scrumdata: ScrumdataService, private router: Router) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    console.log(this.scrumUserLoginData)
    this.Scrumdata.loginUser(this.scrumUserLoginData).subscribe(
      result => {
        console.log('success: ', result);
        localStorage.setItem('token', result.token )
        this.router.navigate(['/scrumboard'])
      },
      error => {
        console.log('error: ', error);
        this.Response = 'Invalid Login Details';
      }
   );
  }

}
