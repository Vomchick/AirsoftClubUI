import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../service/account.service';

@Injectable({
  providedIn: 'root',
})
export class AccountGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(): boolean {
    this.accountService.getAccount().subscribe({
      next: (res) => {
        if (res == null) {
          this.router.navigate(['account']);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });

    return true;
  }
}
