import { Component, OnInit } from '@angular/core';

import { UserService } from './../../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  login = {
    email: '',
    passWrd: ''
  };

  constructor(private userService: UserService) { }

  ngOnInit() { }

  signOn() {
    if (!this.login.email || !this.login.passWrd) {
      alert('you must enter username and password');
    }
    else {
      this.userService.logOn(this.login.email, this.login.passWrd)
        .then(returned => {
          if (this.userService.success) {
            alert('succesfully logged in');
          }
          else {
            this.login.email = '';
            this.login.passWrd = '';
          }
        })
    }
  }

}
