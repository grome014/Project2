import { Component, OnInit, Input } from '@angular/core';
import { Hero }              from '../../models/hero';
import { HeroService }       from '../../services/hero.service'; 

@Component({
  selector: 'app-hero-cards',
  templateUrl: './hero-cards.component.html',
  styleUrls: ['./hero-cards.component.css']
})
export class HeroCardsComponent implements OnInit {
  @Input() heroes: Hero[];
  
  constructor(private heroService: HeroService) { }

  
  ngOnInit(): void {
  //  this.getTestHeroes();
  }

  // getTestHeroes(): void {
  //   this.heroService.getTestHeroes()
  //       .subscribe(data => this.heroes = data)
  // }
}
