import { Component, OnInit } from '@angular/core';
import { ScrumdataService } from '../scrumdata.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  loggedUser;
  loggedIn;
  id

  constructor(private _scrumdataService: ScrumdataService) { }

  ngOnInit() {
    this.loggedUser = this._scrumdataService.getUser();
    this.loggedIn = this._scrumdataService.loggedIn();
    this.id = this.loggedUser.project_id
  }

  

}
