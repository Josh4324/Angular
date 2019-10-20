import { Component, OnInit } from '@angular/core';
import { Scrumuser } from '../scrumuser';
import { NgForm } from '@angular/forms';
import { ScrumdataService } from '../scrumdata.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {


  constructor(private Scrumdata: ScrumdataService) { }

  userTypes = ['Regular User', 'Project Owner'];

  scrumUser: Scrumuser = {
    email: null,
    fullname: null,
    password: null,
    type: 'Regular User',
    projname: null,
  };



  ngOnInit() {
  }


  create(form: NgForm) {
    console.log('in onSubmit: ', form.valid);
    if (form.valid) {
      this.Scrumdata.postUserData(this.scrumUser).subscribe(
        result => {
          console.log('success: ', result);
          form.resetForm()
        },
        error => console.log('error: ', error)
     );
    }
  }

}
