import { Component, OnInit } from '@angular/core';
import { HospitalService } from './services/hospital.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  miSaludo = 'Saludos!!'

  user: any = {name: 'Esteban'}

  cambiar() {
    this.user = { name: 'Juanito', arroz: true }
  }
}
