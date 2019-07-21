import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  loggedIn: string;

  constructor(private afAuth: AngularFireAuth,
    private router:Router) {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.loggedIn = user.email;
      }
    })
  }

  signout() {
    this.afAuth.auth.signOut().then(() => {
      this.loggedIn = null;
      this.router.navigate(['tabs/tab1']);
    });
  }

}
