import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/services/hero.service';
import { Hero } from '../../models/hero';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
//import { TEST_HEROES } from '../../test-heroes';

@Component({
  selector: 'app-hero-mission',
  templateUrl: './hero-mission.component.html',
  styleUrls: ['./hero-mission.component.css']
})


export class HeroMissionComponent implements OnInit {
  testHeroes: Hero[];
  missionHeroes: Hero[] = [];

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  constructor(private heroService: HeroService) { }


  ngOnInit(): void {
    this.getTestHeroes();
  }


  getTestHeroes(): void {
    this.heroService.getTestHeroes()
        .subscribe(data => {
          this.testHeroes = data;
          this.missionHeroes = data;
        })
  }

  

}


