import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Login } from 'src/app/models/login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() info: Login;
  success: Login;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.info = new Login();
  }

  registerUser(): void {
    console.log(this.info);
    this.userService.registerUser(this.info).subscribe(data => this.success = data);
  }

}
