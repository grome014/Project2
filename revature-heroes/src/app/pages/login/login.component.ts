import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  info: Login;
  //success: Login;
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenService: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    this.error = null;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.info = this.loginForm.value;
    console.log(this.info);
    this.userService.loginUser(this.info).subscribe(data => {
      //this.success = data; 
      this.validateLogin(this.success);
      sessionStorage.setItem('current_user', data.userName);
    });
  }

  validateLogin(credentials: Login) {
    if (this.authenService.authenticate(credentials)) {
      //this.router.navigate()
    } else {
      this.error = 'Credentials are incorrect';
      this.loading = false;
    }
  }
}
