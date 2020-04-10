import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private heroUrl = 'http://ec2-54-158-218-76.compute-1.amazonaws.com:8085/RevatureHeroes/';

  constructor(private http: HttpClient) { }
  
  registerUser(login: Login): Observable<Login> {
    return this.http.post<Login>(`${this.heroUrl}register`, login);
  }

  loginUser(login: Login): Observable<Login> {
    return this.http.post<Login>(`${this.heroUrl}login`, login);
  }

  logoutUser(): Observable<String> {
    return this.http.get<String>(`${this.heroUrl}logout`);
  }
}
