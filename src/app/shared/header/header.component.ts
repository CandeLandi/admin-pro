import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {

  public user?: User;

  constructor(  private router: Router,
                private userService: UserService) {

    this.user = userService.user;
  }

  logout(): void {
    this.userService.logout();
  }

  search(term: string): void {
    this.router.navigateByUrl(`/dashboard/search/${ term }`);
  }
}
