import { Component, OnInit, OnDestroy } from '@angular/core';
import { IHospital, Data } from 'src/app/models';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, pluck } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogcreateComponent } from '../material/dialogcreate/dialogcreate.component';
import { UsuarioService, SubirArchivoService } from 'src/app/services';
import { DialogComponent } from '../material/dialog/dialog.component';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {
  
  private hospitalURL = 'http://localhost:3000/hospital';
  buscarInput: FormControl;
  busqueda = false;

  DataHospitales: Data<IHospital> = {
    ok: false,
    data: [],
    limit: undefined,
    currentPage: '',
    proxPage: null,
    prevHistory: [],
    finPage: false
  }

  constructor(private hospitalService: HospitalService, private usuarioService: UsuarioService , public dialog: MatDialog, private subirFotoService: SubirArchivoService) {
    this.buscarInput = new FormControl('')
  }

  ngOnInit(): void {
    this.getHospitales(this.hospitalURL);
    this.buscarHospital()
  }

  getHospitales(url: any, page?: any) {
    this.hospitalService.getHospitales(url, page).subscribe( h => {
      this.DataHospitales = {
        ...this.DataHospitales,
        ...h,
        currentPage: h.currentPage,
        proxPage: h.proxPage
      }

      if( h.data.length < h.limit ) {
        this.DataHospitales.finPage = true;
      } else { 
        this.DataHospitales.finPage = false
      }
    })
  }

  siguiente() {
    this.DataHospitales.prevHistory.push(this.DataHospitales.currentPage)
    if( this.DataHospitales.data.length === this.DataHospitales.limit) {
      this.getHospitales(this.hospitalURL, this.DataHospitales.proxPage);
    }
  }

  prev() {
    let prev = this.DataHospitales.prevHistory.pop()
    if(prev) {
      this.getHospitales(this.hospitalURL, prev);
    } 
  }

  buscarHospital() {
    this.buscarInput.valueChanges
      .pipe(
        debounceTime(750),
        distinctUntilChanged(),
        switchMap( termino => {
          if( !termino ) {
            this.busqueda = false;
            return this.hospitalService.getHospitales( this.hospitalURL ).pipe(
              pluck('data')
            )
          }
          this.busqueda = true;
          return this.hospitalService.buscarHospital( termino ).pipe(
            pluck('hospital')
          );
        })
      ).subscribe( (data: any) => {
        this.DataHospitales.data = data;
      } )
  }

  actualizarHospital( hospital: any ) {
    this.hospitalService.updateHospital( hospital ).subscribe(
      res => console.log('Hospuital update: ', res) ,
      err => console.log( 'EROR: ', err )
    )
  }
  
  openDialogCreate() {
    const dialogRef = this.dialog.open(DialogcreateComponent, {
      data: {
        nombre: this.usuarioService.usuario.nombre.split(' ')[0],
        id: this.usuarioService.usuario._id,
      }
    })

    dialogRef.afterClosed().subscribe( newHospital => {
      
      if( newHospital ) {
        this.hospitalService.crearHospital( newHospital ).subscribe(
          (resHospital: any) => {
            console.log('Hospital creado: ', resHospital)
            if( this.hospitalService.fileFoto ) {
              this.subirFotoService.subirArchivo( this.hospitalService.fileFoto, 'hospitales', resHospital.hospital._id ).then(
                res => {
                  console.log('Imagen subida: ', res)
                  this.hospitalService.fileFoto = null
                  this.getHospitales(this.hospitalURL)
                }
              ).catch( err => console.log( 'Imagen no subida: ', err ))
            }

            this.getHospitales(this.hospitalURL)
          },
          err => console.log('Errror: ', err),
          
        );
      }
    });
  }

  openDialogBorrar(hospital: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        nombre: this.usuarioService.usuario.nombre.split(' ')[0],
        id: hospital._id,
        hospital,
        coleccion: 'hospital' 
      }
    })

    dialogRef.afterClosed().subscribe(id => {
      console.log(`Dialog id HSOPITAL: ${id}`);
      this.hospitalService.borrarHospital( id ).subscribe(
        res => {
          console.log( 'Hospital Borrado', res )
          this.DataHospitales.data = this.DataHospitales.data.filter( h => h._id !== id )
        },
        err => console.log( 'Errror en hospi: ', err )
      )
    });
  }

}
