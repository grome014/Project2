import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  test: String;

  constructor(
    private authenService: AuthenticationService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.authenService.logOut();
    this.userService.logoutUser().subscribe(data => {this.test = data});
    this.router.navigate(['login']);
  }

}
