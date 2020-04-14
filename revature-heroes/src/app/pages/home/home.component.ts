import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { HeroService } from 'src/app/services/hero.service';
import { Hero } from 'src/app/models/hero';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  hero: Hero;
  minHeroId: number;
  maxHeroId: number;
  test: Hero[];

  constructor(
    private authenService: AuthenticationService,
    private heroService: HeroService
    ) { }

  ngOnInit(): void {
    this.user = new User();
    this.user = this.authenService.getUser();
    this.minHeroId = 1;
    this.maxHeroId = 731;
    this.firstLogin(this.user);
  }

  firstLogin(user: User) {
    console.log(user.heroes.length)

    if (user.heroes.length <= 0) {
      this.heroService.getApiHeroes(this.generateRandomId()).subscribe(data => { 
        this.hero = this.createHero(data);
        this.user.heroes.push(this.hero);
        this.heroService.getApiHeroes(this.generateRandomId()).subscribe(data => {
          this.hero = this.createHero(data);
          this.user.heroes.push(this.hero);
          this.heroService.getApiHeroes(this.generateRandomId()).subscribe(data => {
            this.hero = this.createHero(data);
            this.user.heroes.push(this.hero);
            this.heroService.saveHeroes(this.user.heroes).subscribe(data => {
              this.test = data;
              this.authenService.setUser(this.user);
            });
          });
        });
      });
    }
  }

  createHero(data: any): Hero {
    let hero: Hero;
    hero = this.initializeHero(hero);
    //console.log(hero);
    hero.ownerID = this.user.id;
    hero.superID = data.id;
    hero.name = data.name;
    hero.intelligence = data.powerstats.intelligence;
    hero.strength = data.powerstats.strength;
    hero.speed = data.powerstats.speed;
    hero.durability = data.powerstats.durability;
    hero.power = data.powerstats.power;
    hero.combat = data.powerstats.combat;
    hero.url = data.image.url;
    return hero;
  }

  generateRandomId(): number {
    return Math.floor(Math.random() * (this.maxHeroId - this.minHeroId + 1)) + this.minHeroId;
  }

  initializeHero(hero: Hero): Hero {
    hero = {
      ownerID: 0,
      gameID: 0,
      superID: 0,
      name: "",
      intelligence: 0,
      strength: 0,
      speed: 0,
      durability: 0,
      power: 0,
      combat: 0,
      url: "",
    }
    return hero;
  }

}
