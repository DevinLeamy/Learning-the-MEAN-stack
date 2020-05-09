import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessengerPageComponent } from './components/messenger-page/messenger-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'chat/A', component: MessengerPageComponent },
  { path: 'chat/B', component: MessengerPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
