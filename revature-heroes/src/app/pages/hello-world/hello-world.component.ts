import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {

  hello: String;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.getHelloWorld().subscribe(data => this.hello = data);
  }

}
