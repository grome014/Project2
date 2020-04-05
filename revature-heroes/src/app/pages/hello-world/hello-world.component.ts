import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {

  helloObs: Observable<String>;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.helloObs = this.heroService.getHelloWorld();
  }

}
