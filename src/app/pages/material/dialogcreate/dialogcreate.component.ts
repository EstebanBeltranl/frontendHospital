import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SubirArchivoService } from 'src/app/services';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HospitalService } from 'src/app/services/hospital/hospital.service';

@Component({
  selector: 'app-dialogcreate',
  templateUrl: './dialogcreate.component.html',
  styleUrls: ['./dialogcreate.component.css']
})
export class DialogcreateComponent implements OnInit {

  nombre: FormControl;

  constructor( private subirArchivoService: SubirArchivoService, @Inject(MAT_DIALOG_DATA) public data: any, private hospitalService: HospitalService ) { 
    this.nombre = new FormControl('')
  }

  ngOnInit(): void {
  }

  seleccionImagen( event: any) {
    let archivo = event.target.files[0]
    this.hospitalService.fileFoto = archivo;
  }

  crearHospital() {
    return { nombre :this.nombre.value, img: ''};
  }


}
