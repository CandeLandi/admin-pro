import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ComponentsModule
],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ]
})
export class PagesModule { }
