import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';

import { AppComponent } from './app.component';
import { HelloWorldComponent } from './pages/hello-world/hello-world.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { HeaderComponent } from './pages/header/header.component';
import { HeroCardsComponent } from './pages/hero-cards/hero-cards.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeroMissionComponent } from './pages/hero-mission/hero-mission.component';


@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    HeaderComponent,
    HeroCardsComponent,
    HeroMissionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
