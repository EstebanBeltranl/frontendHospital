import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService, SidebarService, UsuarioService, LoginGuard, SubirArchivoService } from './';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import { InterceptorhttpService } from './interceptorhttp.service';
import { HospitalService } from './hospital/hospital.service';

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
    HospitalService,
    LoginGuard,
    SubirArchivoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorhttpService,
      multi: true
    }
  ]
})
export class ServiceModule { }
