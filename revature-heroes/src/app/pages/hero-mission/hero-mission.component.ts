import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/services/hero.service';
import { Hero } from '../../models/hero';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList, CdkDropListGroup} from '@angular/cdk/drag-drop';
import { Mission } from 'src/app/models/mission';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
//import { TEST_HEROES } from '../../test-heroes';

@Component({
  selector: 'app-hero-mission',
  templateUrl: './hero-mission.component.html',
  styleUrls: ['./hero-mission.component.css']
})


export class HeroMissionComponent implements OnInit {
  
  testHeroes: Hero[];
  missionHeroes: Hero[] = [];
  testMissions: Mission[];
  payload: Mission[];

  currently_selected_heroes: Hero[] = [];


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }

    console.log("container id: ", event.container.id);
    console.log("heroes in container: ", event.container.data.length);
    console.log("heores: ", event.container.data);
  }

  constructor(private heroService: HeroService) { }


  ngOnInit(): void {
    this.getTestHeroes();
    this.getTestMissions();
    console.log(this.testMissions);
  }


  getTestHeroes(): void {
    this.heroService.getTestHeroes()
        .subscribe(data => {
          this.testHeroes = data;
        })
  }

  getTestMissions(): void {
    this.heroService.getTestMissions()
        .subscribe(data => {
          this.testMissions = data;
        })
  }

  enterPredicate(drag: CdkDrag, drop: CdkDropList) {
    return true;
  }

  testClick(): void {

  }

}


