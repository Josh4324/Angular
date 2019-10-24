import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ScrumdataService } from './scrumdata.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {

  constructor(private scrumdataService: ScrumdataService, private router: Router) {}

  canActivate(): boolean {
    if (this.scrumdataService.loggedIn()) {
      console.log(true);
      return true;
    } else {
      this.router.navigate(['/login']);
      console.log(false);
      return false;
    }
  }

}
