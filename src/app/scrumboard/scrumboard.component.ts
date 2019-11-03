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

 

  constructor(private _route : ActivatedRoute, private _scrumdataService: ScrumdataService, private http: HttpClient) { }

  project_id = 0;
  _participants = [];

  ngOnInit() {
    this.project_id = parseInt((this._route.snapshot.paramMap.get('project_id')))
    this.getProjectGoals();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
     
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.updateStatus(event.item.element.nativeElement.textContent);
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

  

  updateStatus(data){

    let token = localStorage.getItem('token');
    let Auth = JSON.parse(localStorage.getItem('Auth'));
    let encode = btoa(`${Auth.email}:${Auth.password}`);
    let newlist = data.trim();
    newlist = newlist.split(" ");
    console.log(newlist)
    const stat = newlist[newlist.length - 2]
    const num = newlist[newlist.length - 1];
    console.log(stat, num);
    
    return this.http.patch('http://liveapi.chatscrum.com/scrum/api/scrumgoals/' + num + '/', {status : stat}, {
      headers: new HttpHeaders().set('Authorization', `Basic ${encode}==`)
    } ).subscribe(
      result => (console.log(result)),
      err => console.log(err)
    )
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
