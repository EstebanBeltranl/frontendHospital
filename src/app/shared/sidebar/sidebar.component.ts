import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from 'src/app/services';
import { IUsuario } from 'src/app/models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menus: any;
  usuario: IUsuario;

  constructor(private sidebarService: SidebarService, 
              private usuarioService: UsuarioService) { 
    this.menus = this.sidebarService.menus;
  }
  
  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
  }

  logout() {
    this.usuarioService.logout()
  }
}
