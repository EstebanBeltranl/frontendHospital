import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { CONFIG } from '../../config/config';
import { IResFindByColeccion, IUsuario, Data } from '../../models/index';
import { map, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubirArchivoService } from '../subirarchivo/subir-archivo.service';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: IUsuario = null;
  token: string = null;

  constructor( private http: HttpClient, 
                private router: Router, 
                private _snackBar: MatSnackBar,
                private subirArchivoService: SubirArchivoService ) { 
    this.cargarDelLocalStorage()
  }

  loginGoogle( token: string) {
    return this.http.post( CONFIG.URLLOGINGOOGLE, { token } ).pipe(
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
    
    return this.http.post( CONFIG.URLSERVICIO + '/login', usuario ).pipe(
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
    let token = res['token'] || this.token;
    localStorage.setItem('token', token)
    localStorage.setItem('login', JSON.stringify(res))
    this.usuario = res['usuario'];
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

  actualizarUsuario( usuarioUpdate: any ) {
    let url = CONFIG.URLSERVICIO + '/usuario/' + usuarioUpdate._id;
    console.log('USUARIOuPDATE: ', usuarioUpdate)
    return this.http.put( url, usuarioUpdate ).pipe(
      map( (res: HttpResponse<any>) => {
        console.log('Res del actualizar usuario: ',res)
        if( usuarioUpdate._id === this.usuario._id ) {
          this.guardarEnLocalStorage(res);
        }

        this._snackBar.open('Usuario actualizado', null, {
          duration: 2000
        });

        return true;
      })
    )
  }

  subirImagen( file: File , id: string) {
    this.subirArchivoService.subirArchivo( file, 'usuarios', id )
      .then( (res: any) => {
        console.log('correcto: ', res )
        this.usuario.img = res.usuario.img;
        this.guardarEnLocalStorage(res);
        this._snackBar.open('Imagen actualizada', null, {
          duration: 2500
          });
      })
      .catch( res => console.log('Fallo: ', res ) );
  }

  getUsuarios(url: string, page?: string) {
    if(page) return this.http.get<Data<IUsuario>>( url+`?page=${page}` );
    return this.http.get<Data<IUsuario>>( url );
  }

  buscarUsuario( termino: string ) {
    const busquedaUsuario = CONFIG.URLBUSQUEDAPORCOLECCION.USUARIO;
    if( termino ) {
      return this.http.get( busquedaUsuario + termino )
    }
    return empty() 
  }

  borrarUsuario(id: string) {
    let url = CONFIG.URLSERVICIO + '/usuario/';
    return this.http.delete( url + id ).pipe(
      finalize( () => {
        this._snackBar.open('Usuario borrado', null, {
          duration: 2000
        });
        this.getUsuarios(CONFIG.URLSERVICIO+'/usuario')
      })
    );
  }
}


