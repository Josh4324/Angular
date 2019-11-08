import { Component, OnInit } from '@angular/core';
import { ScrumdataService } from '../scrumdata.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-creategoal',
  templateUrl: './creategoal.component.html',
  styleUrls: ['./creategoal.component.scss']
})
export class CreategoalComponent implements OnInit {

  id;
  data;
  Response;
  loggedUser
  projectData;
  userId

  goalData = {
    goalname : null,
  };

  

  constructor(private _route : ActivatedRoute,private _scrumdataService: ScrumdataService, private router: Router) { }
  project_id = 0;
  ngOnInit() {
    this.loggedUser = this._scrumdataService.getUser();
    this.getProjectGoals();
    console.log("Init")
  }



  onCreateGoal() {
    console.log(this.loggedUser)
    let data = this.projectData['data']

    data.map((list) => {
              if (list.user.nickname === this.loggedUser.name){
                this.userId = this.loggedUser.role_id
                console.log(this.userId)
              }
    })
    let Data = {goalname: this.goalData.goalname, user: 'm' + this.userId, id: this.loggedUser.project_id }
    console.log(Data)
    /* this._scrumdataService.addGoal(Data).subscribe(
      result => {
        console.log(result)
        let data = { project_id: this.loggedUser.project_id}
        console.log(data)
        this._scrumdataService.createSprint(data).subscribe(
          data => (console.log(data)),
          err => (console.log(err))
        )
        this.router.navigate(['/scrumboard',this.loggedUser.project_id ])
      } ,
      err => {
        this.Response = "Error Creating Goal"
        console.log(err)
        
      }
    ); */

    let data1 = { project_id: this.loggedUser.project_id}
    
    this._scrumdataService.addGoal(Data).subscribe(
      result => {
        console.log(result)
        this.router.navigate(['/scrumboard',this.loggedUser.project_id ])
      },
      err => (console.log(err))
  )
  }

  getProjectGoals() {
    console.log(this.loggedUser.project_id)
    this._scrumdataService.allProjectGoals(this.loggedUser.project_id).subscribe(
      data => {
        let obj = data["data"];
        Object.keys(obj).map((data1) => {
          obj[data1].scrumgoal_set.map((list) => {
              
              console.log("h",list)
          })
    
        })
        this.projectData = data;
      },
      error => {
        console.log(error);
      }
    )
  }

}