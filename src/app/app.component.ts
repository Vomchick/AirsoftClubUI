import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isCollapsed = false;
  title = 'Cards';

  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  isNewsPage(): boolean {
    return this.router.url === '/news';
  }

  isTeamPage(): boolean {
    return this.router.url === '/teams';
  }

  isClubPage(): boolean {
    return this.router.url === '/clubs';
  }

  isAccountPage(): boolean {
    return this.router.url === '/account';
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
