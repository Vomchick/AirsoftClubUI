import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { auth_api_url } from '../app-injection-tokens';
import { Router } from '@angular/router';
import { TeamClubModel } from '../models/teamClub.model';
import { Observable } from 'rxjs';
import { TeamRoles } from '../app.module';
import { TeamRequestModel } from '../models/teamRequest.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(
    private http: HttpClient,
    @Inject(auth_api_url) private apiUrl: string
  ) {}

  getPersonalTeam(): Observable<TeamClubModel> {
    return this.http.get<TeamClubModel>(this.apiUrl + 'Team');
  }

  getTeam(id: string): Observable<TeamClubModel> {
    return this.http.get<TeamClubModel>(this.apiUrl + 'Team/' + id);
  }

  getAllTeams(): Observable<TeamClubModel[]> {
    return this.http.get<TeamClubModel[]>(this.apiUrl + 'Team/all');
  }

  updateTeam(team: TeamClubModel): Observable<TeamClubModel> {
    return this.http.put<TeamClubModel>(this.apiUrl + 'Team', team);
  }

  addTeam(team: TeamClubModel): Observable<TeamClubModel> {
    return this.http.post<TeamClubModel>(this.apiUrl + 'Team', team);
  }

  deleteTeam(): Observable<TeamClubModel> {
    return this.http.delete<TeamClubModel>(this.apiUrl + 'Team');
  }

  getRights(id: string): Observable<TeamRoles> {
    return this.http.get<TeamRoles>(this.apiUrl + 'Team/rights/' + id);
  }

  getTeamRequests(teamId: string): Observable<TeamRequestModel[]> {
    return this.http.get<TeamRequestModel[]>(
      this.apiUrl + 'Team/Request/get/' + teamId
    );
  }

  createTeamRequest(createRequest: { teamId: string; description: string }) {
    return this.http.post(this.apiUrl + 'Team/Request/create', createRequest);
  }

  positiveTeamRequest(request: TeamRequestModel) {
    return this.http.post(this.apiUrl + 'Team/Request/pos', request);
  }

  negativeTeamRequest(request: TeamRequestModel) {
    return this.http.post(this.apiUrl + 'Team/Request/neg', request);
  }
}
