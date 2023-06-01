import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { AccountService } from './service/account.service';
import { TeamService } from './service/team.service';
import { TeamRoles } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  title = 'Cards';
  requestsCount: number = 0;
  public haveAccount: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private accountService: AccountService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.accountService.getAccount().subscribe({
      next: (res) => {
        if (res != null) this.haveAccount = true;
      },
    });

    this.teamService.getPersonalTeam().subscribe({
      next: (team) => {
        if (team != null)
          this.teamService.getRights(team.id).subscribe({
            next: (role) => {
              if (role != TeamRoles.Member) {
                this.teamService.getTeamRequests(team.id).subscribe({
                  next: (res) => {
                    this.requestsCount = res.length;
                  },
                });
              }
            },
          });
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
