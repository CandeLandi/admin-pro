import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
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

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard'} },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress'}  },
      { path: 'grafica1', component: Grafica1Component, data: { title: 'Gráficas'}  },
      { path: 'search/:term', component: SearchComponent, data: { title: 'Searchs'}  },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Settings'}  },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promises'}  },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs'}  },
      { path: 'profile', component: ProfileComponent, data: { title: 'Profile'}  },

      //Admin routes
      { path: 'users', canActivate: [ AdminGuard ] ,component: UsersComponent, data: { title: 'Users maintenance' }},

      //Maintenance
      { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals maintenance' }},
      { path: 'doctors', component: DoctorsComponent, data: { title: 'Doctors maintenance' }},
      { path: 'doctor/:id', component: DoctorComponent, data: { title: 'Doctors maintenance' }}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
