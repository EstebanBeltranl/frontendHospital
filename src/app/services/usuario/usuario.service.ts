import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CONFIG } from '../../config/config';
import { IResFindByColeccion, IUsuario } from '../../models/index';
import { map } from 'rxjs/operators';
import { isNull } from 'util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: IUsuario = null;
  token: string = null;

  constructor( private http: HttpClient, private router: Router ) { 
    this.cargarDelLocalStorage()
  }

  loginGoogle( token: string) {
    return this.http.post( CONFIG.URLLOGINGOOGLE, { token }, { observe: 'response' } ).pipe(
      map( (res: any) => {
        this.guardarEnLocalStorage(res)
        return true
      })
    )
  }

  login( usuario: any, recuerdame?: boolean) {
    if( recuerdame ) {
      localStorage.setItem('email', JSON.stringify( { email: usuario.email, recuerdame: recuerdame } ))
    } else {
      localStorage.removeItem('email')
    }
    
    return this.http.post( CONFIG.URLSERVICIO + '/login', usuario, { observe: 'response' } ).pipe(
      map( (res: any) => {
        this.guardarEnLocalStorage(res)
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

  guardarEnLocalStorage( res: HttpResponse<any> ) {
    let token = res.headers.get('Authorization')
    localStorage.setItem('token', token)
    localStorage.setItem('login', JSON.stringify(res.body))
    this.usuario = res.body.usuario;
    this.token = token;
  }

  cargarDelLocalStorage() {
    this.token = localStorage.getItem('token') || null;
    if( !!localStorage.getItem('login') ) {
      const { usuario  } = JSON.parse( localStorage.getItem('login') );
      this.usuario = usuario || null;
    } 
  }

  isLogged() {
    return this.token ? true: false; 
  }

  logout() {
    this.usuario = null;
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    this.router.navigate(['/login']);
  }

}


