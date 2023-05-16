import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';
import { auth_api_url } from '../app-injection-tokens';
import { Token } from '../models/token.model';
import { User } from '../models/user.model';

export const access_token_key = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    @Inject(auth_api_url) private apiUrl: string,
    private router: Router
  ) {}

  login(userInfo: { userName: string; password: string }): Observable<Token> {
    return this.http.post<Token>(this.apiUrl + 'Auth/login', userInfo).pipe(
      tap((token) => {
        localStorage.setItem(access_token_key, token.access_token);
      })
    );
  }

  register(userInfo: User): Observable<Token> {
    userInfo.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Token>(this.apiUrl + 'Auth/register', userInfo).pipe(
      tap((token) => {
        localStorage.setItem(access_token_key, token.access_token);
      })
    );
  }

  isAuthenticated(): boolean {
    var token = localStorage.getItem(access_token_key);
    if (this.jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem(access_token_key);
    }
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem(access_token_key);
    this.router.navigate(['']);
  }
}
