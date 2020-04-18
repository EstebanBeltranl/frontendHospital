import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Data, IUsuario } from 'src/app/models';
import { UsuarioService } from 'src/app/services';
import { debounceTime, distinctUntilChanged, switchMap, pluck, map } from 'rxjs/operators';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../material/dialog/dialog.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  private usuarioURL = 'http://localhost:3000/usuario';
  cargando = true;
  busqueda = false;

  buscarInput: FormControl;
  
  DataUsuarios: Data<IUsuario> = {
    ok: false,
    data: [],
    limit: undefined,
    currentPage: '',
    proxPage: null,
    prevHistory: [],
    finPage: false
  }

  constructor( private usuariosService: UsuarioService,
              public dialog: MatDialog) { 
    this.buscarInput = new FormControl('')
  }

  openDialog(usuario: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        nombre: this.usuariosService.usuario.nombre.split(' ')[0],
        id: usuario._id,
        usuario,
        coleccion: 'usuario' 
      }
    })

    dialogRef.afterClosed().subscribe(id => {
      console.log(`Dialog id: ${id}`);
      if( id ) {
        this.borrarUsuario( id )
      }
    });
  }

  ngOnInit(): void {
    this.getUsuarios( this.usuarioURL )
    this.buscarUsuario();
  }

  getUsuarios(url: string, page?: string) {
    this.cargando = true;
    this.usuariosService.getUsuarios(url, page).subscribe(
      res => {
        this.DataUsuarios = {
          ...this.DataUsuarios,
          ...res,
          currentPage: res.currentPage,
          proxPage: res.proxPage
        }
        
        this.DataUsuarios.data = this.DataUsuarios.data.filter( usuario => usuario._id !== this.usuariosService.usuario._id )
        
        if(page && this.DataUsuarios.prevHistory.length > 0) {
          this.DataUsuarios.data.shift()
        }

        this.cargando = false;
      }
    )
  }

  prevPage() {
    let prev = this.DataUsuarios.prevHistory.pop()
    if(prev) {
      this.getUsuarios(this.usuarioURL, prev)
    }
  }

  nextPage() {
    this.DataUsuarios.prevHistory.push( this.DataUsuarios.currentPage );
    const { proxPage } = this.DataUsuarios;
    if( proxPage ) {
      this.getUsuarios( this.usuarioURL, proxPage )
    }
  }

  buscarUsuario() {
    this.buscarInput.valueChanges
      .pipe(
        debounceTime(750),
        distinctUntilChanged(),
        switchMap( termino => {
          if( !termino ) {
            this.busqueda = false;
            return this.usuariosService.getUsuarios( this.usuarioURL ).pipe(
              pluck('data')
            )
          }
          this.busqueda = true;
          return this.usuariosService.buscarUsuario( termino ).pipe(
            pluck('usuario')
          );
        })
      ).subscribe( (data: any) => {
        this.DataUsuarios.data = data;
      } )
  }

  borrarUsuario(id: string) {
    this.usuariosService.borrarUsuario(id).subscribe( (usuarioBorrado: any) => {
      console.log('Usuario Borrado: ', usuarioBorrado)
      this.DataUsuarios.data = this.DataUsuarios.data.filter( usuario => usuario._id !== usuarioBorrado.usuario._id )   
    },
    err => console.log('ERROR AL BORRAR: ', err) );
  }

  actualizarUsuario( usuario: any ) {
    this.usuariosService.actualizarUsuario(usuario).subscribe();
  }

}
