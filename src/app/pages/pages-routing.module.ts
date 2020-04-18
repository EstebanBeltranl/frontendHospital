import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuard } from '../services';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalComponent } from './hospital/hospital.component';


const routes: Routes = [
  {  
    path: '', 
    component: PagesComponent,
    canActivate: [LoginGuard] , 
    children: [
      {  path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      {  path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil' } },
      // mantenimiento
      {  path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento usuarios' } },
      {  path: 'hospitales', component: HospitalComponent, data: { titulo: 'Mantenimiento hospitales' } },

      {  path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
