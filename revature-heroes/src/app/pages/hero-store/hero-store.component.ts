import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList, CdkDropListGroup} from '@angular/cdk/drag-drop';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-hero-store',
  templateUrl: './hero-store.component.html',
  styleUrls: ['./hero-store.component.css']
})
export class HeroStoreComponent implements OnInit {

  user: User;
  storeHeroes: Hero[] = [];
  heroToSell: Hero[] = [];
  hero: Hero;
  
  constructor(
    private authenService: AuthenticationService,
    private heroService: HeroService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.user = this.authenService.getUser();
    this.heroService.getApiHeroes(1).subscribe( data => {
      this.hero = this.createHero(data);
      this.storeHeroes.push(this.hero);
    });
  }

  drop(event: CdkDragDrop<Hero[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event);
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

      if (event.previousContainer.id == "buyHero") {
        this.buyHero(event.container.data[event.currentIndex]);
      }
    }
    // console.log("container id: ", event.container.id);
    // console.log("heroes in container: ", event.container.data.length);
    // console.log("heores: ", event.container.data);
  }

  enterPredicate(drag: CdkDrag, drop: CdkDropList) {
    return true;
  }

  heroesPredicate(drag: CdkDrag, drop: CdkDropList) {
    if (drop.data.length < 10) {
      return true;
    }
    return false;
  }

  buyPredicate() {
    return false;
  }

  sellPredicate(drag: CdkDrag, drop: CdkDropList) {
    // console.log(drag);
    if (drop.data.length == 0 || drag.data.length >= 2) {
      return true;
    }
    return false;
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

  sellHero() {
    console.log(this.heroToSell[0]);
    this.heroService.deleteHero(this.heroToSell[0]).subscribe(data => {
      this.user.heroes = data;
      this.authenService.setUser(this.user);
      this.heroToSell.pop();
      this.snackBar.open('Hero sold.', 'Dismiss', {
        duration: 3000
      });
    })
  }

  buyHero(hero: Hero) {
    this.heroService.addHero(hero).subscribe(data => {
      this.user.heroes = data;
      this.authenService.setUser(this.user);
      this.snackBar.open('Congratulations! You got ' + hero.name + '!', 'Dismiss', {
        duration: 5000
      });
    })
  }
}
