import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroUrl = 'http://ec2-54-80-76-22.compute-1.amazonaws.com:8085/RevatureHeroes/';

  constructor(private http: HttpClient) { }

  getHelloWorld(): Observable<String> {
    return this.http.get<String>(`${this.heroUrl}greeting`);
  }
}
