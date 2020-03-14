import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    NopagefoundComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BreadcrumbsComponent,
    SidebarComponent,
    NopagefoundComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
