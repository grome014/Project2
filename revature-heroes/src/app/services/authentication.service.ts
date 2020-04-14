import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { UserService } from './user.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: User;

  constructor(
    private userService: UserService
  ) { }

  authenticate(info: User): Boolean {
    if (info != null) {
      // sessionStorage.setItem('user', JSON.stringify(info));
      this.setUser(info);
      return true;
    } else {
      return false;
    }
  }


  isUserLoggedIn(): Boolean {
    let user = sessionStorage.getItem('user');
    return !(user === null);
  }

  logOut(): void {
    sessionStorage.removeItem('user');
    this.user = null;
    this.userService.logoutUser();
  }

  setUser(user: User) {
    // this.user = JSON.parse(sessionStorage.getItem('user'));
    // sessionStorage.setItem("userId", user.id.toString());
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User {
    return JSON.parse(sessionStorage.getItem('user'));
  }
}
