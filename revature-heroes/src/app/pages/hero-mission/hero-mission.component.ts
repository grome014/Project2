import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/services/hero.service';
import { Hero } from '../../models/hero';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList, CdkDropListGroup} from '@angular/cdk/drag-drop';
import { Mission } from 'src/app/models/mission';
import { MissionService } from 'src/app/services/mission.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

//import { TEST_HEROES } from '../../test-heroes';

@Component({
  selector: 'app-hero-mission',
  templateUrl: './hero-mission.component.html',
  styleUrls: ['./hero-mission.component.css']
})



export class HeroMissionComponent implements OnInit {
  availableHeroes: Hero[];
  testMissions: Mission[];
  availableMissions: Mission[];
  inProgressMissions: Mission[];
  completedMissions: Mission[];
  tempMissions: Mission[];

  user: User;

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
          x += hero[mission.requirements.statRequired];
        }
        
        mission.missionSuccess = Math.floor((x / mission.requirements.missionLevel) * 100);
      }
    }
  }

  constructor(private heroService: HeroService, private missionService: MissionService, private authenService: AuthenticationService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.user = this.authenService.getUser();

    this.availableHeroes = [];
    this.availableMissions = [];
    this.inProgressMissions = [];
    this.completedMissions = [];
    this.getHeroes();
    this.getMissions();
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

  getHeroes(): void {
    this.heroService.getHeroes(this.user.id).subscribe(heroes => {
      heroes.forEach(hero => {
        console.log("hero from getHeroes", hero);
        if(hero.status == "Available") {
          this.availableHeroes.push(hero);
        }
      })
    })
  }

  getMissions(): void {
    this.missionService.getMissions(this.user.id)
        .subscribe(data => {
          // this.testMissions = data;
          // console.log("test 1: ", this.testMissions);
          this.sortMissions(data)
        });
  }

  enterPredicate(drag: CdkDrag, drop: CdkDropList) {
    return false;
  }

  missionPredicateFalse(drag: CdkDrag, drop: CdkDropList) {
    return false;
  }

  startMission(mission: Mission): void {
    mission.missionStart = Date.now();
    mission.heroes.forEach(hero => {
      hero.status = "Busy";
    });
    console.log("here's mission.heroes FOR GALO and for SCIENCE", mission.heroes);
    this.heroService.saveHeroes(mission.heroes).subscribe(data => {
      console.log("Heroes that I'm getting back from Michael: ", data);
      let temp = [];
      data.forEach(hero => {
        console.log("Looping through heroes sent back from Michael from saveHeroes: ", hero)
        if(hero.status == "Available") {
          temp.push(hero);
        }
      })
      this.availableHeroes = temp;
    })
    this.missionService.startMission(mission).subscribe(data => {
      console.log("Mission that got returned from 'startMission': ", data);
      this.sortMissions(data);
      this.snackBar.open("Mission started!", 'Okay', {
        duration: 10000
      });
    })
    
  }

  completeMission(mission: Mission): void {
    mission.heroes.forEach(hero => {
      hero.status = "Available";
      console.log("Hero status changed. ", hero);
    })
    console.log("HERO I AM SENDING MICHAEL: ", mission.heroes);
    this.heroService.saveHeroes(mission.heroes).subscribe(data => {
      let temp = [];
      console.log("saveHeroes response: ", data);
      data.forEach(hero => {
        console.log("Response from save heroes: ", data)
        if(hero.status == "Available") {
          temp.push(hero);
        }
      })
      this.availableHeroes = temp;
    })

    this.missionService.completeMission(mission).subscribe(data => {
      console.log("rewards: ", data);
      this.user.treasury.heroDollars += data.heroDollars;
      this.user.treasury.heroEssence += data.heroEssence;
      this.user.treasury.powerUp     += data.powerUp;
      this.authenService.setUser(this.user);

      this.snackBar.open(`Rewards collected: Hero Dollars: ${data.heroDollars}, Hero Essence: ${data.heroEssence}, Power-ups: ${data.powerUp}`, '', {
        duration: 10000
      });
    });

    
    mission.missionFinish = Date.now();
    this.missionService.startMission(mission).subscribe(data => {
      console.log("Missions return from start(complete)Mission", data)
      this.sortMissions(data);
    })
  }

  sortMissions(missions: Mission[]): void {
    this.availableMissions = [];
    this.inProgressMissions = [];
    this.completedMissions = [];
    for (let mission of missions) {
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
}


