import { Component, OnInit } from '@angular/core';
import { ScrumdataService } from '../scrumdata.service';
import { Router } from '@angular/router';
import {ScrumboardComponent } from '../scrumboard/scrumboard.component'

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.scss']
})
export class CreateprojectComponent implements OnInit {
  
  ProjectData = {
    fullname: "",
    email: "",
    projname: "",
};
  Response: string;
  loggedUser;
  

  constructor(private Scrumdata: ScrumdataService, private router: Router) { }

  ngOnInit() {
    this.loggedUser = this.Scrumdata.getUser();
  }

  onLoginProject(){
    console.log(this.ProjectData);
    this.Scrumdata.createProject(this.ProjectData).subscribe(
      data => {
        console.log('success: ', data);
        this.router.navigate(['/home/'])
      },
      error => {
        console.log('error: ', error);
        this.Response = 'Error, Unable to Create Project';
      }
   );
  }

}
