import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/services/hero.service';
import { Hero } from '../../models/hero';

@Component({
  selector: 'app-hero-mission',
  templateUrl: './hero-mission.component.html',
  styleUrls: ['./hero-mission.component.css']
})


export class HeroMissionComponent implements OnInit {
  testHeroes: Hero[];

  constructor(private heroService: HeroService) { }

  
  ngOnInit(): void {
  }


  getTestHeroes(): void {
    this.heroService.getTestHeroes()
        .subscribe(data => this.testHeroes = data)
  }

}
