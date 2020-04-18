import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services';
import { IUsuario } from 'src/app/models';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  formUsuario: FormGroup;
  usuario: IUsuario;
  imagenSubir: File;

  constructor( private fb: FormBuilder, private usuarioService: UsuarioService ) { 
    this.usuario = this.usuarioService.usuario;
    this.initForm();
  }

  ngOnInit(): void {
    console.log('Usuarioooooo: ', this.usuarioService.usuario )
    
  }

  initForm() {
    this.formUsuario = this.fb.group({
      nombre: [null, Validators.minLength(3)],
      email: [null]
    })

    if( this.usuario.google ) {
      this.formUsuario.get('email').disable()
    }

    if(!!localStorage.getItem('login')) {
      const { nombre, email } = JSON.parse( localStorage.getItem('login') ).usuario;
      this.formUsuario.patchValue({
        nombre,
        email
      })
    }

  }

  guardar() {
    let usuarioUpdate = {
      ...this.formUsuario.value,
      role: this.usuario.role,
      _id: this.usuario._id
    }
    this.usuarioService.actualizarUsuario( usuarioUpdate ).subscribe({
      next: () => {
        this.usuario.nombre = this.formUsuario.get('nombre').value;
        this.usuario.email = this.formUsuario.get('email').value;
      },
      error: (err) => console.log( 'error', err ),
      complete: () => console.log('Update complete')
    });
  }

  seleccionImagen(event: any){
    let archivo = event.target.files[0]
    this.imagenSubir = archivo;

    console.log(archivo, event)
  }

  subirFoto() {
    console.log( 'Subir Foto' )
    this.usuarioService.subirImagen( this.imagenSubir, this.usuario._id );
  }


}
