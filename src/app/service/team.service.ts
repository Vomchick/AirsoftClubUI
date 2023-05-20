import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { auth_api_url } from '../app-injection-tokens';
import { Router } from '@angular/router';
import { TeamClubModel } from '../models/teamClub.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(
    private http: HttpClient,
    @Inject(auth_api_url) private apiUrl: string,
    private router: Router
  ) {}

  getTeam(): Observable<TeamClubModel> {
    return this.http.get<TeamClubModel>(this.apiUrl + 'Team');
  }

  getAllTeams(): Observable<TeamClubModel[]> {
    return this.http.get<TeamClubModel[]>(this.apiUrl + 'Team/all');
  }

  updateTeam(team: TeamClubModel): Observable<TeamClubModel> {
    debugger;
    return this.http.put<TeamClubModel>(this.apiUrl + 'Team', team);
  }

  addTeam(team: TeamClubModel): Observable<TeamClubModel> {
    return this.http.post<TeamClubModel>(this.apiUrl + 'Team', team);
  }

  deleteTeam(): Observable<TeamClubModel> {
    return this.http.delete<TeamClubModel>(this.apiUrl + 'Team');
  }
}
