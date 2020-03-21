import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuard } from '../services';


const routes: Routes = [
  {  
    path: '', 
    component: PagesComponent,
    canActivate: [LoginGuard] , 
    children: [
      {  path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      {  path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
