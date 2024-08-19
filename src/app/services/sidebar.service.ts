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
      { title: 'Gráficas', url: 'grafica1'}
    ]
  }
  ]

}
