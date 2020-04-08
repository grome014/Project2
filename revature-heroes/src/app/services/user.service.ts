import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private heroUrl = 'http://ec2-54-158-218-76.compute-1.amazonaws.com:8085/RevatureHeroes/';
  private test = 'http://136.53.74.123:8080/RevatureHeroes/';


  constructor(private http: HttpClient) { }
  
  registerUser(login: Login): Observable<Login> {
    return this.http.post<Login>(`${this.heroUrl}register`, login);
  }
}
