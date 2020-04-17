import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList, CdkDropListGroup} from '@angular/cdk/drag-drop';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

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
    private snackBar: MatSnackBar,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = this.authenService.getUser();
    this.heroService.getApiHeroes(1).subscribe( data => {
      this.hero = this.createHero(data);
      this.storeHeroes.push(this.hero);
      this.heroService.getApiHeroes(40).subscribe( data => {
        this.hero = this.createHero(data);
        this.storeHeroes.push(this.hero);
        this.heroService.getApiHeroes(644).subscribe( data => {
          this.hero = this.createHero(data);
          this.storeHeroes.push(this.hero);
        });
      });
    });
  }

  drop(event: CdkDragDrop<Hero[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event);
      if (event.previousContainer.id == "sellHero" || event.previousContainer.id == "userHeroes") {
        transferArrayItem(event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);
      } else if ((event.previousContainer.id == "buyHero") && 
          (this.user.treasury.heroEssence < this.heroPrice(event.container.data[event.currentIndex]))) {
        this.snackBar.open('Not enough Essence!', 'Dismiss', {
          duration: 3000
        });
      } else if (event.previousContainer.id == "buyHero" &&
          (this.user.treasury.heroEssence >= this.heroPrice(event.container.data[event.currentIndex]))) {
            console.log("buy hero");
            transferArrayItem(event.previousContainer.data,
                              event.container.data,
                              event.previousIndex,
                              event.currentIndex);
            this.buyHero(event.container.data[event.currentIndex]);
      }
    }
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
    if (drop.data.length == 0 && drag.dropContainer.data.length >= 2) {
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
    this.user.treasury.heroEssence = this.user.treasury.heroEssence + this.sellPrice(this.heroPrice(this.heroToSell[0]));
    this.heroService.deleteHero(this.heroToSell[0]).subscribe(data => {
      this.user.heroes = data;
      this.authenService.setUser(this.user);
      this.heroToSell.pop();
      this.snackBar.open('Hero sold.', 'Dismiss', {
        duration: 3000
      });
      this.userService.updateUser(this.user).subscribe(data => {
        this.user = data;
      })
    })
  }

  buyHero(hero: Hero) {
    this.user.treasury.heroEssence = this.user.treasury.heroEssence - this.heroPrice(hero);
    
    this.heroService.addHero(hero).subscribe(data => {
      this.user.heroes = data;
      this.authenService.setUser(this.user);
      this.snackBar.open('Congratulations! You got ' + hero.name + '!', 'Dismiss', {
        duration: 5000
      });
      this.userService.updateUser(this.user).subscribe(data => {
        this.user = data;
        console.log(this.user);
      });
    })
  }

  heroPrice(hero: Hero): number {
    let price: number = 0;

    price = ((+hero.combat + +hero.power + +hero.durability) / 10) + 5

    price = Math.round(price);
    return price;
  }

  sellPrice(price: number) {
    let sellPrice: number;

    sellPrice = price / 2;
    sellPrice = Math.round(sellPrice);

    return sellPrice;
  }
}
