import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsersComponent } from './maintenance/users/users.component';
import { DoctorComponent } from './maintenance/doctors/doctor.component';

@NgModule({
  declarations: [
    AccountSettingsComponent,
    DashboardComponent,
    DoctorsComponent,
    Grafica1Component,
    HospitalsComponent,
    PagesComponent,
    ProfileComponent,
    ProgressComponent,
    PromisesComponent,
    RxjsComponent,
    UsersComponent,
    DoctorComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
  ],
})
export class PagesModule {}
