import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessengerPageComponent } from './components/messenger-page/messenger-page.component';


const routes: Routes = [
  { path: '', component: MessengerPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
