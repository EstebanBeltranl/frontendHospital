import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule
  ],
  exports: [DashboardComponent]
})
export class PagesModule { }
