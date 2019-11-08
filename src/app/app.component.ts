import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { ScrumdataService } from './scrumdata.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent implements OnInit {

  loggedIn;

  constructor(private dataService:DataService, private _scrumdataService: ScrumdataService) {

  }

  ngOnInit() {
    this.loggedIn = this._scrumdataService.loggedIn();
    console.log(this.loggedIn)
  }


 logOut(){
   localStorage.clear()
 }



}
