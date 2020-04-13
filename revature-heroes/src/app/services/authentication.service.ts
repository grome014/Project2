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
      sessionStorage.setItem('username', info.userName);
      this.setUser(info);
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn(): Boolean {
    let user = sessionStorage.getItem('username');
    return !(user === null);
  }

  logOut(): void {
    sessionStorage.removeItem('username');
    this.user = null;
    this.userService.logoutUser();
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }
}
