import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/services/hero.service';
import { Hero } from '../../models/hero';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList, CdkDropListGroup} from '@angular/cdk/drag-drop';
import { Mission } from 'src/app/models/mission';
import { MissionService } from 'src/app/services/mission.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';

//import { TEST_HEROES } from '../../test-heroes';

@Component({
  selector: 'app-hero-mission',
  templateUrl: './hero-mission.component.html',
  styleUrls: ['./hero-mission.component.css']
})


export class HeroMissionComponent implements OnInit {
  availableHeroes: Hero[];
  testHeroes: Hero[];
  testMissions: Mission[];
  availableMissions: Mission[];
  inProgressMissions: Mission[];
  completedMissions: Mission[];


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }

    console.log("container id: ", event.container.id, "|| heroes in container: ", event.container.data.length, event.container.data);
    for(let mission of this.availableMissions) {
      if (mission.heroes.length !== 0) {
        let x = 0;
        for (let hero of mission.heroes) {
          console.log("mission used: ", mission)
          console.log("hero used", hero);
          console.log("hero stat looked up: ", mission.requirements.statRequired, "=", hero[mission.requirements.statRequired])
          x += hero[mission.requirements.statRequired];
        }
        console.log("total hero power for this mission = ", x);
        console.log("mission success chance: ", (x / mission.requirements.missionLevel) * 100)
        mission.missionSuccess = (x / mission.requirements.missionLevel) * 100;
      }
    }
  }

  constructor(private heroService: HeroService, private missionService: MissionService, private authenService: AuthenticationService, private _snackBar: MatSnackBar) { }

  

  ngOnInit(): void {
    this.availableHeroes = [];
    this.availableMissions = [];
    this.inProgressMissions = [];
    this.completedMissions = [];
    this.getTestHeroes();
    this.getTestMissions();
    
    console.log("Available Missions: ", this.availableMissions)
    console.log("Missions in Progress: ", this.inProgressMissions);
    console.log("Completed Missions: ", this.completedMissions);
  }

  getTimeRemaining(mission: Mission): string {
    let missionDurationMiliseconds = mission.requirements.missionDuration * 1000;
    let timeElapsedMiliseconds = Date.now() - mission.missionStart;
    if (timeElapsedMiliseconds >= missionDurationMiliseconds) {
      return "Mission Completed";
    } else if (timeElapsedMiliseconds < missionDurationMiliseconds) {
      return `${Math.floor((missionDurationMiliseconds - timeElapsedMiliseconds) / 1000)}sec`;
    }
  }

  getTestHeroes(): void {
    this.heroService.getTestHeroes()
        .subscribe(data => {
          for (let i in data) {
            if (data[i].status == "Available") {
              console.log(data[i]);
              this.availableHeroes.push(data[i]);
            }
          }
          //this.testHeroes = data;
        })
  }

  getMissions(): void {
    this.missionService.getMissions(sessionStorage.getItem("userID"))
        .subscribe(data => {
          this.testMissions = data;
        });

    for (let mission of this.testMissions) {
      switch(mission.missionStatus) {
        case "Available":
          this.availableMissions.push(mission)
          break;
        case "In Progress":
          this.inProgressMissions.push(mission);
          break;
        case "Completed":
          this.completedMissions.push(mission);
          break;
      }
    }
  }

  enterPredicate(drag: CdkDrag, drop: CdkDropList) {
    return false;
  }

  missionPredicateFalse(drag: CdkDrag, drop: CdkDropList) {
    return false;
  }

  startMission(mission: Mission): void {
    mission.missionStart = Date.now();
    mission.missionStatus = "In Progress";
    // console.log("mission being sent: ", mission);
    // console.log("mission array: ", this.availableMissions);
    //this.inProgressMissions.push(mission);

    //------ removing the mission started from inProgress
    let temp = [];
    for(let x of this.availableMissions) {
      if(x.missionStart != null) {
        temp.push(x);
      }
    }
    this.availableMissions = temp;
    //------

    this.missionService.startMission(mission).subscribe(data => {
      this.inProgressMissions.push(data);
    })
  }
}


