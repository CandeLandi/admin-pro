import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from '../environments/environment';
import { RegisterForm } from '../auth/interfaces/register-form.interface';
import { LoginForm } from '../auth/interfaces/login-form.interface';
import { tap, map, catchError, of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { loadUser } from '../auth/interfaces/load-users-interface';
import Swal from 'sweetalert2';

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
  ) {}

  get uid(): string {
    return this.user!.uid || '';
  }
  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  logout() {
    localStorage.removeItem('token');

    if (google && google.accounts && google.accounts.id) {
      google.accounts.id.revoke(this.user?.email, () => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/login');
        });
      });
    } else {
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
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const { email, google, name, role, img = '', uid } = resp.user;

          this.user = new User(name, email, '', img, google, role, uid);
          localStorage.setItem('token', resp.token); // Almacenar el nuevo token
          return true;
        }),
        catchError((error) => of(false))
      );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  updateUser(data: { email: string; name: string; role: string }) {
        data = {
      ...data,
      role: this.user!.role,
    };
    return this.http.put(`${base_url}/users/${this.uid}`, data, this.headers);
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

  loadUsers(desde: number = 0) {
    //localhost:3000/api/users?desde=0
    const url = `${base_url}/users?desde=${desde}`;
    return this.http.get<loadUser>(url, this.headers).pipe(
      /*       delay(1000), */
      map((resp) => {
        const users = resp.users.map(
          (user) =>
            new User(
              user.name,
              user.email,
              '',
              user.img,
              user.google,
              user.role,
              user.uid
            )
        );
        return {
          total: resp.total,
          users,
        };
      })
    );
  }

  deleteUser(user: User) {
    const url = `${base_url}/users/${user.uid}`;
    return this.http.delete(url, this.headers);
  }

  saveUser(user: User) {
    return this.http.put(`${base_url}/users/${user.uid}`, user , this.headers);
  }
}
