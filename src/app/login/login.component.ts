import { Component, OnInit } from '@angular/core';
import { Router, Navigation } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UsuarioService } from '../services';
import { HttpErrorResponse } from '@angular/common/http';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  getCurrentStateNavigation: Navigation;
  mensajeErrorOnSubmit = null;
  mensajesDeErrorCampos = null;


  constructor(private router: Router, 
              private _snackBar: MatSnackBar, 
              private fb: FormBuilder,
              private usuarioService: UsuarioService) { 
    this.getCurrentStateNavigation = this.router.getCurrentNavigation();
    
  }
  
  ngOnInit(): void {
    
    init_plugins();
    this.initForm()
    this.formLogin.get('email').setValue(localStorage.getItem('email'))
    this.llenarFormSiHayUnRegister()

  }

  ingresar(){
    const { email, password, recuerdame } = this.formLogin.value;

    if( this.formLogin.valid ) {
      this.usuarioService.login( { email, password }, recuerdame ).subscribe(
        res => {
          console.log('res: ', res);
          this.mensajeErrorOnSubmit = null
          this.router.navigate(['/']);
        },
        (err: HttpErrorResponse ) => {
          console.log(err)
          this.mensajeErrorOnSubmit = err.error.mensaje
        }
      )
    }
  }

  initForm() {
    this.formLogin = this.fb.group({
      email: [ null , Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      recuerdame: [null] 
    })
  }

  llenarFormSiHayUnRegister() {
    const { usuario } = this.getCurrentStateNavigation.extras.state;
    if( usuario ) {
      this._snackBar.open('Has sido Registrado, inicia sesion.', null, {
        duration: 1500,
      });
      this.formLogin.get('email').setValue(usuario.email)
    }
  }


  get email() {
    return this.formLogin.get('email')
  }

}
