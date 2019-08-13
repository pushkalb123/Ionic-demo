import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

import { UserService } from './../user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  loggedIn: string;

  constructor(private afAuth: AngularFireAuth,
    private router:Router,
    private userService: UserService) {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.loggedIn = user.email;
      }
    })
  }

  signout() {
    this.userService.logout();
    this.loggedIn = '';
  }

}
