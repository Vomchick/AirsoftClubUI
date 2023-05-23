import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { auth_api_url } from '../app-injection-tokens';
import { TeamClubModel } from '../models/teamClub.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  constructor(
    private http: HttpClient,
    @Inject(auth_api_url) private apiUrl: string
  ) {}

  getPersonalClub(): Observable<TeamClubModel> {
    return this.http.get<TeamClubModel>(this.apiUrl + 'Club');
  }

  getMyClubs(): Observable<TeamClubModel[]> {
    return this.http.get<TeamClubModel[]>(this.apiUrl + 'Club/allMine');
  }

  joinTheClub(club: TeamClubModel): Observable<TeamClubModel> {
    return this.http.get<TeamClubModel>(this.apiUrl + 'Club/join/' + club.id);
  }

  leaveTheClub(club: TeamClubModel): Observable<TeamClubModel> {
    return this.http.get<TeamClubModel>(this.apiUrl + 'Club/leave/' + club.id);
  }

  getClub(id: string): Observable<TeamClubModel> {
    return this.http.get<TeamClubModel>(this.apiUrl + 'Club/' + id);
  }

  getAllClubs(): Observable<TeamClubModel[]> {
    return this.http.get<TeamClubModel[]>(this.apiUrl + 'Club/all');
  }

  updateClub(id: string, club: TeamClubModel): Observable<TeamClubModel> {
    return this.http.put<TeamClubModel>(this.apiUrl + 'Club/' + id, club);
  }

  addClub(club: TeamClubModel): Observable<TeamClubModel> {
    return this.http.post<TeamClubModel>(this.apiUrl + 'Club', club);
  }

  deleteClub(id: string): Observable<TeamClubModel> {
    return this.http.delete<TeamClubModel>(this.apiUrl + 'Club/' + id);
  }

  getRights(id: string): Observable<boolean> {
    return this.http.get<boolean>(this.apiUrl + 'Club/rights/' + id);
  }
}
