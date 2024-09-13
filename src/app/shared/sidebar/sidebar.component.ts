import { Component } from '@angular/core';

import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  menuItems: any[];

  public user?: User;

  constructor( private sidebarService: SidebarService,
               private userService: UserService
   ){
    this.menuItems = sidebarService.menu;

  }

  ngOnInit() {
    // Obtener el usuario del servicio
    this.userService.validateToken().subscribe(isValid => {
      if (isValid) {
        this.user = this.userService.user;
      }
    });
  }

}
