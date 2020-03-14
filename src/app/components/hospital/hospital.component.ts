import { Component, OnInit, OnDestroy } from '@angular/core';
import { IHospital, Data } from 'src/app/models';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {
  
  private hospitalURL = 'http://localhost:3000/hospital';

  DataHospitales: Data<IHospital> = {
    ok: false,
    data: [],
    limit: undefined,
    currentPage: '',
    proxPage: null,
    prevHistory: [],
    finPage: false
  }

  constructor(private hospitalService: HospitalService) {}

  ngOnInit(): void {
    this.getHospitales(this.hospitalURL);
    console.log('On Init')
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

  

}
