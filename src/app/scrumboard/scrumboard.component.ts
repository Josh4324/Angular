import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrumdataService } from '../scrumdata.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrls: ['./scrumboard.component.scss']
})
export class ScrumboardComponent implements OnInit {

  todo = ["Learn Django", "Learn Python", "Learn PHP"];
  doing = ["Learn Design"];
  done = ["Learn Linux", "Learn Ansible"];
  TFTW = [];
  TFTD = [];
  VERIFY = [];
  DONE = []
  loggedUser;

 

  constructor(private _route : ActivatedRoute, private _scrumdataService: ScrumdataService, private http: HttpClient) { }

  project_id = 0;
  _participants = [];

  ngOnInit() {
    this.loggedUser = this._scrumdataService.getUser();
    this.project_id = parseInt((this._route.snapshot.paramMap.get('project_id')))
    this.getProjectGoals();
  }

  calculateRole(val){
    val = val.split("-");
    if((val[3] % 4) === 3 ){
      return 3;
    }
    if((val[3] % 4) === 2 ){
      return 2;
    }
    if((val[3] % 4) === 1 ){
      return 1;
    }
    if((val[3] % 4) === 0 ){
      return 0;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
     
    } else {
      console.log(event.container.id)
      console.log(event.item.data)
      event.item.data[2] = this.calculateRole(event.container.id)
      console.log(event.item.data)
      this._scrumdataService.updateStatus(event.item.data).subscribe(
        data => (console.log(data)),
        err => (console.log(err))
      )
      
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      
    }
  }

  filter(data) {
    let obj = data["data"]
    console.log(obj)
    Object.keys(obj).map((data1) => {
      obj[data1].scrumgoal_set.map((list) => {
          if (list.status === 0){
            this.TFTW.push([obj[data1].user.nickname, list.name,list.status, list.id ] )
            
          }
          if (list.status === 1){
            this.TFTD.push([obj[data1].user.nickname, list.name,list.status, list.id ] )
          }
          if (list.status === 2){
            this.VERIFY.push([obj[data1].user.nickname, list.name, list.status,  list.id ] )
          }
          if (list.status === 3){
            this.DONE.push([obj[data1].user.nickname, list.name, list.status,  list.id ] )
          }
      })

    })
  }



  getProjectGoals() {
    this._scrumdataService.allProjectGoals(this.project_id).subscribe(
      data => {
        this.filter(data);
        this._participants = data["data"];
      },
      error => {
        console.log(error);
      }
    )
  }

}
