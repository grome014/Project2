import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Hero }       from '../hero';
import { TEST_HEROES } from '../test-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroUrl = 'http://ec2-54-158-218-76.compute-1.amazonaws.com:8085/RevatureHeroes/';

  constructor(private http: HttpClient) { }

  getHelloWorld(): Observable<String> {
    return this.http.get<String>(`${this.heroUrl}greeting`);
  }

  getHeroes(id): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.heroUrl}${id}`);
    //@TODO: I need a path to get heroes from! -Logan
  }

  getTestHeroes(): Observable<Hero[]> {
    return of(TEST_HEROES);
  }
}