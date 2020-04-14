import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Login } from 'src/app/models/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  info: Login;
  success: Login;
  registerForm: FormGroup;
  submitted = false;
  loading = false;
  error: string;
  user: User;

  constructor(private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.info = new Login();
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  registerUser(): void {
    console.log(this.info);
    this.userService.registerUser(this.info).subscribe(data => this.success = data);
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.info = this.registerForm.value;
    console.log(this.info);
    this.userService.registerUser(this.info).subscribe(data => {this.success = data, 
      this.validateRegistration(this.success)});
  }

  validateRegistration(credentials: Login) {
    if (credentials != null) {
      this.snackBar.open('Registered! Please log in.', '', {
        duration: 3000
      });
      this.router.navigate(['login'])
    } else {
      this.error = 'Username ' + this.info.userName + ' is already taken!';
      this.loading = false;
    }
  }
}
