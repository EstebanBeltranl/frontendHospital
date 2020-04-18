import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    NopagefoundComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    RouterModule
  ],
  exports: [
    BreadcrumbsComponent,
    SidebarComponent,
    NopagefoundComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
