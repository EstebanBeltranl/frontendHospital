import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHospital, Data } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor( private http: HttpClient ) { }


  getHospitales(url: any, page?: any) {
    if(page) return this.http.get<Data<IHospital>>( url+`?page=${page}` );
    return this.http.get<Data<IHospital>>( url );
  }

}
