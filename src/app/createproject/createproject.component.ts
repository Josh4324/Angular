import { Component, OnInit } from '@angular/core';
import { ScrumdataService } from '../scrumdata.service';
import { Router } from '@angular/router';

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

  constructor(private Scrumdata: ScrumdataService, private router: Router) { }

  ngOnInit() {
  }

  onLoginProject(){
    console.log(this.ProjectData);
    this.Scrumdata.createProject(this.ProjectData).subscribe(
      data => {
        console.log('success: ', data);
        this.router.navigate(['/home'])
      },
      error => {
        console.log('error: ', error);
        this.Response = 'Error, Unable to Create Project';
      }
   );
  }

}
