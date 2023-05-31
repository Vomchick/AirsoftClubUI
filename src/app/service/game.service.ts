import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { auth_api_url } from '../app-injection-tokens';
import { GameModel } from '../models/game.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(
    private http: HttpClient,
    @Inject(auth_api_url) private apiUrl: string
  ) {}

  getGame(id: string): Observable<GameModel> {
    return this.http.get<GameModel>(this.apiUrl + 'Game/' + id);
  }

  getAllGames(clubId: string): Observable<GameModel[]> {
    return this.http.get<GameModel[]>(this.apiUrl + 'Game/all/' + clubId);
  }

  updateGame(gameId: string, game: GameModel): Observable<GameModel> {
    return this.http.put<GameModel>(this.apiUrl + 'Game/' + gameId, game);
  }

  addGame(clubId: string, game: GameModel): Observable<GameModel> {
    return this.http.post<GameModel>(this.apiUrl + 'Game/' + clubId, game);
  }

  deleteGame(gameId: string): Observable<GameModel> {
    return this.http.delete<GameModel>(this.apiUrl + 'Game/' + gameId);
  }
}
