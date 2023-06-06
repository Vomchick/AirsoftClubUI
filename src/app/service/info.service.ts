import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { auth_api_url } from '../app-injection-tokens';
import { Observable } from 'rxjs';
import { InfoPostModel } from '../models/infoPost.model';
import { InfoPostRequestModel } from '../models/infoPostRequest.model';
import { AuthorType } from '../app.module';

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  constructor(
    private http: HttpClient,
    @Inject(auth_api_url) private apiUrl: string
  ) {}

  getAllInfos(infoPost: {
    authorId: string;
    authorType: AuthorType;
  }): Observable<InfoPostModel[]> {
    return this.http.post<InfoPostModel[]>(this.apiUrl + 'info/all', infoPost);
  }

  getNews(): Observable<InfoPostModel[]> {
    return this.http.get<InfoPostModel[]>(this.apiUrl + 'info/news');
  }

  updateInfo(
    postId: string,
    infoPost: InfoPostModel
  ): Observable<InfoPostModel> {
    return this.http.put<InfoPostModel>(
      this.apiUrl + 'info/' + postId,
      infoPost
    );
  }

  addInfo(infoPost: InfoPostModel): Observable<InfoPostModel> {
    return this.http.post<InfoPostModel>(this.apiUrl + 'info', infoPost);
  }

  deleteInfo(
    postId: string,
    infoPost: InfoPostModel
  ): Observable<InfoPostModel> {
    return this.http.post<InfoPostModel>(
      this.apiUrl + 'info/delete/' + postId,
      infoPost
    );
  }
}
