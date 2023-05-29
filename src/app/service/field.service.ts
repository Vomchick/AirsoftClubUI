import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { auth_api_url } from '../app-injection-tokens';
import { Observable } from 'rxjs';
import { FieldModel } from '../models/field.model';

@Injectable({
  providedIn: 'root',
})
export class FieldService {
  constructor(
    private http: HttpClient,
    @Inject(auth_api_url) private apiUrl: string
  ) {}

  getField(id: string): Observable<FieldModel> {
    return this.http.get<FieldModel>(this.apiUrl + 'Field/' + id);
  }

  getAllFields(clubId: string): Observable<FieldModel[]> {
    return this.http.get<FieldModel[]>(this.apiUrl + 'Field/all/' + clubId);
  }

  updateField(fieldId: string, field: FieldModel): Observable<FieldModel> {
    return this.http.put<FieldModel>(this.apiUrl + 'Field/' + fieldId, field);
  }

  addField(clubId: string, field: FieldModel): Observable<FieldModel> {
    return this.http.post<FieldModel>(this.apiUrl + 'Field/' + clubId, field);
  }

  deleteField(fieldId: string): Observable<FieldModel> {
    return this.http.delete<FieldModel>(this.apiUrl + 'Field/' + fieldId);
  }
}
