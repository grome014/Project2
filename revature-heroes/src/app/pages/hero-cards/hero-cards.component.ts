import { Component, OnInit } from '@angular/core';
import { HeroService }       from '../../services/hero.service'; 
import { Hero } from 'src/app/models/hero';

@Component({
  selector: 'app-hero-cards',
  templateUrl: './hero-cards.component.html',
  styleUrls: ['./hero-cards.component.css']
})
export class HeroCardsComponent implements OnInit {
  heroes: Hero[];

  
  constructor(private heroService: HeroService) { }

  
  ngOnInit(): void {
   this.getTestHeroes();
  }

  getTestHeroes(): void {
    this.heroService.getTestHeroes()
        .subscribe(data => this.heroes = data)
  }

}
