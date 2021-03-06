import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloWorldComponent } from './pages/hello-world/hello-world.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HeroCardsComponent } from './pages/hero-cards/hero-cards.component';
import { HeroMissionComponent } from './pages/hero-mission/hero-mission.component';
import { HomeComponent } from './pages/home/home.component';
import { HeroStoreComponent } from './pages/hero-store/hero-store.component';


const routes: Routes = [
  { path: 'helloworld', component: HelloWorldComponent },
  { path: 'hero-mission', component: HeroMissionComponent, canActivate:[AuthGuardService]},
  { path: 'hero-cards', component: HeroCardsComponent, canActivate:[AuthGuardService] },
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent, canActivate:[AuthGuardService] },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuardService] },
  { path: 'store', component: HeroStoreComponent, canActivate:[AuthGuardService]},
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];



@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
