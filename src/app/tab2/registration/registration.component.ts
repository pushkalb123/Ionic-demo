import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Tab2Page } from './../tab2.page';

import { UserService } from './../../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  reg = {
    email: '',
    passWrd1: '',
    passWrd2: ''
  };

  constructor(
    private afAuth: AngularFireAuth,
    private router:Router,
    private userService: UserService) { }

  ngOnInit() { }

  registerAccount() {
    if (this.reg.passWrd1 !== this.reg.passWrd2) {
      alert('passwords dont match');
      this.reg.passWrd1 = '';
      this.reg.passWrd2 = '';
    } else {
      this.afAuth.auth.createUserWithEmailAndPassword(this.reg.email, this.reg.passWrd1)
        .then(res => this.regSuccess(res))
        .catch(err => this.regError(err));
    }
  }

  private regSuccess(res) {
    this.userService.logOn(this.reg.email, this.reg.passWrd1)
      .then(res => this.router.navigate(['tabs/tab2/success']));
  }

  private regError(err) {
    alert('error during registration');
  }

}
