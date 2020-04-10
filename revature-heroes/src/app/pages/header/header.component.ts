import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  flag: AuthenticationService;
  constructor(private authenService: AuthenticationService) { }

  ngOnInit(): void {
    this.flag = this.authenService;
  }

}
