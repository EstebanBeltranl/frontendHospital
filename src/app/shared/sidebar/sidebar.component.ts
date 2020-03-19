import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menus: any;
  constructor(private sidebarService: SidebarService) { 
    this.menus = this.sidebarService.menus;
  }
  
  ngOnInit(): void {}

}
