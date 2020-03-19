import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;

  constructor(private router: Router, private title:Title) { 
    this.getData().subscribe( data => {
      this.titulo = data.titulo
      this.title.setTitle( data.titulo )
    })
  }
  
  ngOnInit(): void {}

  getData() {
    return this.router.events.pipe(
      filter( evt => evt instanceof ActivationEnd ),
      filter( (evt: ActivationEnd) => evt.snapshot.data['titulo'] ),
      map( (evt: ActivationEnd) => evt.snapshot.data )
    )
  }

}
