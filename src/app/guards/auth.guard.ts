import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const userService = inject(UserService)
  const router = inject(Router)
  const token = localStorage.getItem('token');

 return  userService.validateToken()
 .pipe(
  tap( isAuthenticated => {
    if(!isAuthenticated){
      router.navigateByUrl('/login')
    }
  })
 )

};
