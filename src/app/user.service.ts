import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Storage } from '@ionic/storage'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  items: AngularFireList<any>;
  success: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private storage: Storage,
    private fbDb: AngularFireDatabase) {
    this.items = fbDb.list('/users');
  }
  logout() {
    // this.storageControl('delete');
    this.afAuth.auth.signOut()
      .then(loggedOut => alert('logged out'))
      .catch(err => alert('error in logout'));
  }

  storageControl(action, key?, value?) {
    if (action == 'set') {
      return this.storage.set(key, value);
    }
    if (action == 'get') {
      return this.storage.get(key);
    }
    if (action == 'delete') {
      if (!key) {
        alert('about to delete all the user data');
        return this.storage.clear();
      }
      else {
        alert('deleting user' + key);
        return this.storage.remove(key);
      }

    }
  }

  saveNewUser(user) {
    let userObj = {
      creation: new Date().toDateString(),
      logins: 1,
      rewardCount: 0,
      lastLogin: new DataCue().toLocaleString(),
      id: ''
    }
    this.items.push({
      username: user,
      creation: userObj.creation,
      logins: userObj.logins,
      rewardCount: userObj.rewardCount,
      lastLogin: userObj.lastLogin
    })
      .then(res => {
        userObj.id = res.key;
        return this.storageControl('set', user, userObj);
      });
    return this.storageControl('get', user);
  }

  updateUser(theUser, theUserData) {
    let newData = {
      creation: theUserData.creation,
      logins: theUserData.logins + 1,
      rewardCount: theUserData.rewardCount,
      lastLogin: new DataCue().toLocaleString(),
      id: theUserData.id
    }
    this.items.update(newData.id, {
      logins: newData.logins,
      rewardCount: newData.rewardCount,
      lastLogin: newData.lastLogin,
    });
    return this.storageControl('set', theUser, newData);
  }

  logOn(user, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(user, password)
      .then(result => {
        this.storageControl('get', user)
          .then(returned => {
            if (!returned) {
              this.saveNewUser(returned)
                .then(res => alert('new account saved for this user'));
            }
            else {
              this.updateUser(user, returned)
                .then(updated => alert('user updated'));
            }
          });
        this.success = true;
        return result;
      })
      .catch(err => {
        this.success = false;
        alert('error');
        return err;
      })
  }
}
