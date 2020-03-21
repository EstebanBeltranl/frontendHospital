import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService, SidebarService, UsuarioService, LoginGuard } from './';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import { InterceptorhttpService } from './interceptorhttp.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorhttpService,
      multi: true
    }
  ]
})
export class ServiceModule { }
