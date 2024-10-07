import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorComponent } from './maintenance/doctors/doctor.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  {
    path: 'progress',
    component: ProgressComponent,
    data: { title: 'Progress' },
  },
  {
    path: 'grafica1',
    component: Grafica1Component,
    data: { title: 'Gráficas' },
  },
  {
    path: 'search/:term',
    component: SearchComponent,
    data: { title: 'Searchs' },
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    data: { title: 'Settings' },
  },
  {
    path: 'promises',
    component: PromisesComponent,
    data: { title: 'Promises' },
  },
  { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
  { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },

  //Admin routes
  {
    path: 'users',
    canActivate: [AdminGuard],
    component: UsersComponent,
    data: { title: 'Users maintenance' },
  },

  //Maintenance
  {
    path: 'hospitals',
    component: HospitalsComponent,
    data: { title: 'Hospitals maintenance' },
  },
  {
    path: 'doctors',
    component: DoctorsComponent,
    data: { title: 'Doctors maintenance' },
  },
  {
    path: 'doctor/:id',
    component: DoctorComponent,
    data: { title: 'Doctors maintenance' },
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
