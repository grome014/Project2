import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloWorldComponent } from './pages/hello-world/hello-world.component';

const routes: Routes = [
  { path: '', redirectTo: '/helloworld', pathMatch: 'full' },
  { path: 'helloworld', component: HelloWorldComponent }
];



@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
