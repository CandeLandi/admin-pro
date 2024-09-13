import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from '../environments/environment';
import { RegisterForm } from '../auth/interfaces/register-form.interface';
import { LoginForm } from '../auth/interfaces/login-form.interface';
import { tap, map, catchError, of, Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UserService {

  public user?: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
  }

  logout() {
    // Remover el token de localStorage
    localStorage.removeItem('token');

    if (google && google.accounts && google.accounts.id) {
      // Revocar el token de Google si Google Identity Services está listo
      google.accounts.id.revoke(this.user?.email, () => {
        this.ngZone.run(() => {
          // Redirigir al login después de revocar el token
          this.router.navigateByUrl('/login');
        });
      });
    } else {
      // Si Google Identity Services no está listo, solo realizar el logout normal
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    }
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        map((resp: any) => {
          const { email, google, name, role, img = '', uid } = resp.user;

          this.user = new User(name, email, '', img, google, role, uid);
          localStorage.setItem('token', resp.token); // Almacenar el nuevo token
          return true;
        }),
        catchError(error => of(false))
      );
  }


  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }
}
