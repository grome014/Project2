import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private userService: UserService
  ) { }

  authenticate(info: Login): Boolean {
    if (info != null) {
      sessionStorage.setItem('username', info.userName);
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
    this.userService.logoutUser();
  }
}
