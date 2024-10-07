import { CanActivateFn, CanLoadFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const authGuardCanLoad: CanLoadFn = (route, segments) => {

  const userService = inject(UserService);
  const router = inject(Router);
  const token = localStorage.getItem('token');

  return userService.validateToken().pipe(
    tap(isAuthenticated => {
      console.log('isAuthenticated:', isAuthenticated);
      if (!isAuthenticated) {
        console.log('Redirigiendo al login (CanLoad)');
        router.navigateByUrl('/login');
      } else {
        console.log('Acceso permitido al módulo cargable');
      }
    })
  );
};


export const authGuard: CanActivateFn = (route, state) => {

  const userService = inject(UserService);
  const router = inject(Router);
  const token = localStorage.getItem('token');

  return userService.validateToken().pipe(
    tap(isAuthenticated => {
      console.log('isAuthenticated:', isAuthenticated);
      if (!isAuthenticated) {
        console.log('Redirigiendo al login');
        router.navigateByUrl('/login');
      } else {
        console.log('Acceso permitido al dashboard');
      }
    })
  );
};
