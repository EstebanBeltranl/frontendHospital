import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UsuarioService } from './usuario/usuario.service';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class InterceptorhttpService implements HttpInterceptor {

  constructor( private usuarioService: UsuarioService,
              private _snackBar: MatSnackBar  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let tokenUsuarioActual = this.usuarioService.token;
    
    if( tokenUsuarioActual ) { 
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${tokenUsuarioActual}`
        }
      })
    }

    return next.handle(req).pipe(
      catchError( (err: HttpErrorResponse) => {
        if( err.status === 401 ) {
          this.usuarioService.logout()
          this._snackBar.open('Sesión caducada, inicia sesión', null, {
            duration: 1500,
          });
        }
        let error = err.error.mensaje || err.statusText;
        return throwError(  error  )
      })
    )
  }
}
