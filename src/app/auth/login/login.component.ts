import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

declare const google: any;
declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements AfterViewInit {


  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', Validators.required],
    remember: [false],
  });

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called');
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id:
        '863067665849-293q002qi6kbluh33koknna77ss16r70.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large' }
    );
  }

  handleCredentialResponse(response: any) {
    /*     console.log({ esto: this}) */
    console.log('Enconded JWT ID token:' + response.credential);

    this.userService.loginGoogle(response.credential).subscribe((resp) => {
      /*       console.log({ login: resp }) */
      this.ngZone.run(() => {
        this.router.navigateByUrl('/dashboard');
      });
    });
  }

  login() {
    this.userService
      .login({
        email: this.loginForm.get('email')!.value!,
        password: this.loginForm.get('password')!.value!,
        remember: this.loginForm.get('remember')!.value!,
      })
      .subscribe(
        (resp) => {
          // Guardar email en el localStorage si está activada la opción "remember"
          if (this.loginForm.get('remember')?.value) {
            localStorage.setItem('email', this.loginForm.get('email')!.value!);
          } else {
            localStorage.removeItem('email');
          }

          // Redirigir al dashboard
          this.router.navigateByUrl('/dashboard');
        },
        (err) => {
          // Mostrar error si algo sale mal
          Swal.fire('Error', err.error.msg, 'error');
        }
      );
  }
}
