import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../services';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

declare function init_plugins();
// Usando la lib de api de google
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  formLogin: FormGroup;
  mensajeErrorOnSubmit = null;
  @ViewChild('btnGoogle') btnGoogle: ElementRef;
  auth2: any;

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private _snackBar: MatSnackBar) {}

  ngAfterViewInit(): void {
    this.googleInit();
  }
  
  ngOnInit(): void {
    init_plugins();
    this.initForm();
  }

  ingresar(){
    const { email, password, recuerdame } = this.formLogin.value;
    if( this.formLogin.valid ) {
      this.usuarioService.login( { email, password }, recuerdame ).subscribe(
        res => {
          this.mensajeErrorOnSubmit = null
          this.router.navigate(['/dashboard']);
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
      password: ['esteban', Validators.compose([Validators.required, Validators.minLength(3)])],
      recuerdame: [null] 
    })

    if( localStorage.getItem('email') ) {
      let { recuerdame, email } = JSON.parse(localStorage.getItem('email'));
      // Actualizar una parte del formulario
      this.formLogin.patchValue({
        email,
        recuerdame
      })
    }
  }

  get email() {
    return this.formLogin.get('email')
  }

  //Referencia a la docu de google: https://developers.google.com/identity/sign-in/web/build-button
  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '686922171643-sgnf7etrtu91tjvjgublqf44k516ukj6.apps.googleusercontent.com',
        scope: 'profile email'
      });

      this.attachSignin( this.btnGoogle )
    })
  }

  attachSignin( element: ElementRef ) {
    const { nativeElement } = element;
    this.auth2.attachClickHandler(nativeElement, {}, 
      (googleUser: any) => {
        let {id_token} = googleUser.getAuthResponse();

        this.usuarioService.loginGoogle( id_token).subscribe( 
          res => window.location.href = '/dashboard',
          (err: HttpErrorResponse ) => {

            this._snackBar.open( err.error.mensaje , null, {
              duration: 1500,
              });
          }
        )
      });
  }

}
