import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services';
import { IUsuario } from 'src/app/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario: IUsuario;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
  }

  logout() {
    this.usuarioService.logout()
  }
}
