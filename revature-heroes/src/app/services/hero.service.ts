import { Injectable }     from '@angular/core';
import { HttpClient }     from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Hero }           from '../models/hero';
import { TEST_HEROES }    from '../test-heroes';
import { User }           from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // private heroUrl = 'http://ec2-54-158-218-76.compute-1.amazonaws.com:8085/RevatureHeroes/';
  private heroUrl = 'http://ec2-54-82-77-20.compute-1.amazonaws.com:8085/RevatureHeroes/';
  private apiUrl = 'https://www.superheroapi.com/api.php/10219874160636069/';

  constructor(private http: HttpClient) { }

  getHelloWorld(): Observable<String> {
    return this.http.get<String>(`${this.heroUrl}greeting`);
  }

  getHeroes(user: User): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.heroUrl}${user.id}`);
  }

  // getHeroes(): Observable<Hero[]> {
  //   return this.http.get<Hero[]>(`${this.heroUrl}${sessionStorage.getItem("user")}`);
  // }

  //will need to invoke this method for each randomly generated hero id received
  getApiHeroes(id: number): Observable<any> {
    console.log(id);
    return this.http.get(`${this.apiUrl}${id}`);
  }

  getTestHeroes(): Observable<Hero[]> {
    return of(TEST_HEROES);
  }

  saveHeroes(heroes: Hero[]): Observable<Hero[]> {
    console.log("post data: ", heroes)
    return this.http.post<Hero[]>(`${this.heroUrl}saveHeroes`, heroes);
  }

  getTestMissions(): Observable<Mission[]> {
    return of(TEST_MISSIONS);
  }

  deleteHero(hero: Hero): Observable<Hero[]> {
    return this.http.post<Hero[]>(`${this.heroUrl}deleteHero`, hero);
  }

  addHero(hero: Hero): Observable<Hero[]> {
    return this.http.post<Hero[]>(`${this.heroUrl}addHero`, hero);
  }
}