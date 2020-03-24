import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GarageListComponent } from './garage-list/garage-list.component';
import { GarageDetailsComponent } from './garage-details/garage-details.component';

const routes: Routes = [
  { path: 'garages', component: GarageListComponent },
  { path: 'garages/1', component: GarageDetailsComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
