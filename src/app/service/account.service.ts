import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { auth_api_url } from '../app-injection-tokens';
import { Router } from '@angular/router';
import { AccountModel } from '../models/account.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private http: HttpClient,
    @Inject(auth_api_url) private apiUrl: string,
    private router: Router
  ) {}

  getAccount(): Observable<AccountModel> {
    return this.http.get<AccountModel>(this.apiUrl + 'account');
  }

  updateAccount(acc: AccountModel): Observable<AccountModel> {
    return this.http.put<AccountModel>(this.apiUrl + 'account', acc);
  }

  addAccount(acc: AccountModel): Observable<AccountModel> {
    return this.http.post<AccountModel>(this.apiUrl + 'account', acc);
  }
}
