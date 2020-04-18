import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { PerfilComponent } from './perfil/perfil.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsuariosComponent } from './usuarios/usuarios.component';

import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './material/dialog/dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { HospitalComponent } from './hospital/hospital.component';
import { DialogcreateComponent } from './material/dialogcreate/dialogcreate.component';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    PerfilComponent,
    DialogComponent,
    UsuariosComponent,
    HospitalComponent,
    DialogcreateComponent
  ],
  entryComponents: [DialogComponent, DialogcreateComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    PipesModule,
    ReactiveFormsModule,
    FormsModule,
    PagesRoutingModule
  ],
  exports: [DashboardComponent, MatButtonModule]
})
export class PagesModule { }
