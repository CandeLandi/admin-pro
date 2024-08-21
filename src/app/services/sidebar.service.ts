import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }
  menu: any[] = [
  {
    title: 'Dashboard',
    icono: 'mdi mdi-gauge',
    submenu: [
      { title: 'Main', url: '/'},
      { title: 'ProgressBar', url: 'progress'},
      { title: 'Graphics', url: 'grafica1'},
      { title: 'Settings', url: 'account-settings'},
      { title: 'Promises', url: 'promises'},
      { title: 'Rxjs', url: 'rxjs'}
    ]
  }
  ]

}
