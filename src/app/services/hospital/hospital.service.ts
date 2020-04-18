import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHospital, Data } from '../../models';
import { CONFIG } from 'src/app/config/config';
import { empty } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  fileFoto: File = null;

  constructor( private http: HttpClient,  private _snackBar: MatSnackBar ) { }

  getHospitales(url: any, page?: any) {
    if(page) return this.http.get<Data<IHospital>>( url+`?page=${page}` );
    return this.http.get<Data<IHospital>>( url );
  }

  getHospita(id: string) {
    
  }

  buscarHospital( termino: string ) {
    const busquedaHospital = CONFIG.URLBUSQUEDAPORCOLECCION.HOSPITAL;
    if( termino ) {
      return this.http.get( busquedaHospital + termino );
    }

    return empty()
  }

  crearHospital( hospital: any ) {
    return this.http.post( CONFIG.URLSERVICIO+'/hospital', hospital ).pipe(
      finalize( () => {
        console.log( 'FINALIZE' )
        this._snackBar.open('Hospital creado', null, {
          duration: 2000
        });
      } )
    );
  }

  updateHospital(hospital: any) {
    return this.http.put( CONFIG.URLSERVICIO + `/hospital/${hospital._id}`, { nombre: hospital.nombre } )
  }

  borrarHospital(id: string) {
    return this.http.delete( CONFIG.URLSERVICIO + `/hospital/${id}` )
  }

}
