import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, FormControl, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { UsuarioService } from '../services';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IResFindByColeccion } from '../models';
import { MatSnackBar } from '@angular/material/snack-bar';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;
  controlNombre: FormControl;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    init_plugins();
    this.initForm()
  }

  initForm() {
    this.formRegister = this.fb.group({
      nombre: [null, Validators.required],
      email: [null, 
        { 
          validators: [Validators.compose([Validators.required, Validators.email])], 
          asyncValidators: [this.findEmail()] ,
          updateOn: 'blur'
        }
      ],
      password: [null, Validators.required],
      password2: [null, Validators.required],
      condiciones: [false, Validators.requiredTrue],
    }, { validators: this.compararPassword })
  }

  get password2() {
    return this.formRegister.get('password2')
  }

  get email() {
    return this.formRegister.get('email')
  }

  private compararPassword( formgroup: FormGroup): ValidationErrors | null {
    const { password, password2 } = formgroup.value;
    let valid = true;
    if( password2 ) {
      valid = password === password2;
    }
    return valid ? null : { igualPassword: {description: 'Las contraseñas tienen que ser iguales'} }
  }

  registrarUsuario() {
    let newUsuario = {
      nombre: this.formRegister.value['nombre'],
      email: this.formRegister.value['email'],
      password: this.formRegister.value['password']
    }
    this.usuarioService.crearUsuario( newUsuario ).subscribe( 
      (res: any) => {
        this._snackBar.open('Has sido Registrado, inicia sesion.', null, {
          duration: 1500,
          });
        this.router.navigate(['/login'])
      },
      err => console.log('error: ', err)
    );
  }

  
  private findEmail(): AsyncValidatorFn {
    return (control: AbstractControl ): Observable<ValidationErrors | null> => {
      return this.usuarioService.findPorEmail(control.value).pipe(
        map((res: IResFindByColeccion) => res.usuario.length > 0 ? { emailExiste: { description: 'Este email ya esta en uso.' } } : null )
      )
    }
  }
  

}
