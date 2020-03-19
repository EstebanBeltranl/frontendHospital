import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from '../../config/config';
import { IResFindByColeccion } from '../../models/index';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient ) { }

  login( usuario: any, recuerdame?: boolean) {
    if( recuerdame ) {
      localStorage.setItem('email', usuario.email)
    } else {
      localStorage.removeItem('email')
    }
    
    return this.http.post( CONFIG.URLSERVICIO + '/login', usuario ).pipe(
      map( (res: any) => {
        localStorage.setItem('data', JSON.stringify(res))
        return res
      })
    )
  }

  crearUsuario(usuario: any)  {
    return this.http.post( CONFIG.URLSERVICIO + '/usuario', usuario );
  }

  findPorEmail(busqueda: string) {
    return this.http.get<IResFindByColeccion>( CONFIG.URLBUSQUEDAPORCOLECCION.USUARIO + busqueda )
  }
}
