import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { auth_api_url } from '../app-injection-tokens';
import { Observable } from 'rxjs';
import { TeamRegistrationModel } from '../models/teamRegistration.model';
import { SoloRegistrationModel } from '../models/soloRegistration.model';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(
    private http: HttpClient,
    @Inject(auth_api_url) private apiUrl: string
  ) {}

  getTeamRegistration(gameId: string): Observable<TeamRegistrationModel> {
    return this.http.get<TeamRegistrationModel>(
      this.apiUrl + 'registration/team/' + gameId
    );
  }

  getAllTeamRegistrations(): Observable<TeamRegistrationModel[]> {
    return this.http.get<TeamRegistrationModel[]>(
      this.apiUrl + 'registration/team'
    );
  }

  updateTeamRegistration(
    gameId: string,
    teamReg: TeamRegistrationModel
  ): Observable<TeamRegistrationModel> {
    teamReg.gameId = gameId;
    return this.http.put<TeamRegistrationModel>(
      this.apiUrl + 'registration/team',
      teamReg
    );
  }

  addTeamRegistration(
    gameId: string,
    teamReg: TeamRegistrationModel
  ): Observable<TeamRegistrationModel> {
    teamReg.gameId = gameId;
    return this.http.post<TeamRegistrationModel>(
      this.apiUrl + 'registration/team',
      teamReg
    );
  }

  deleteTeamRegistrationGame(
    gameId: string
  ): Observable<TeamRegistrationModel> {
    return this.http.delete<TeamRegistrationModel>(
      this.apiUrl + 'registration/team/' + gameId
    );
  }

  getSoloRegistration(gameId: string): Observable<SoloRegistrationModel> {
    return this.http.get<SoloRegistrationModel>(
      this.apiUrl + 'registration/solo/' + gameId
    );
  }

  getAllSoloRegistrations(): Observable<SoloRegistrationModel[]> {
    return this.http.get<SoloRegistrationModel[]>(
      this.apiUrl + 'registration/solo'
    );
  }

  updateSoloRegistration(
    gameId: string,
    soloReg: SoloRegistrationModel
  ): Observable<SoloRegistrationModel> {
    soloReg.gameId = gameId;
    return this.http.put<SoloRegistrationModel>(
      this.apiUrl + 'registration/solo',
      soloReg
    );
  }

  addSoloRegistration(
    gameId: string,
    soloReg: SoloRegistrationModel
  ): Observable<SoloRegistrationModel> {
    soloReg.gameId = gameId;
    return this.http.post<SoloRegistrationModel>(
      this.apiUrl + 'registration/solo',
      soloReg
    );
  }

  deleteSoloRegistrationGame(
    gameId: string
  ): Observable<SoloRegistrationModel> {
    return this.http.delete<SoloRegistrationModel>(
      this.apiUrl + 'registration/solo/' + gameId
    );
  }
}
