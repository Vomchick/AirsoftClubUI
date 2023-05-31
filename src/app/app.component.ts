import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { AccountService } from './service/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  title = 'Cards';
  public haveAccount: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountService.getAccount().subscribe({
      next: (res) => {
        if (res != null) this.haveAccount = true;
      },
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  isNewsPage(): boolean {
    return this.router.url === '/news';
  }

  isTeamPage(): boolean {
    return (
      this.router.url === '/teams' || this.router.url.includes('/teamInfo')
    );
  }

  isClubPage(): boolean {
    return (
      this.router.url === '/clubs' || this.router.url.includes('/clubInfo')
    );
  }

  isAccountPage(): boolean {
    return this.router.url === '/account';
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
