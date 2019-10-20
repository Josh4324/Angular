import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {LoginData} from '../loginData';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logindata : LoginData = {
    email: null,
    password: null,
    projectName: null
  };

  constructor() { }

  ngOnInit() {
  }

  login(form : NgForm){
    console.log('in onSubmit: ', form.valid);
  }

}
