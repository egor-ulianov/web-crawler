import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from '../models/tag/tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  private readonly _apiUrl = '/api/tags'; // Update with your actual API URL

  constructor(private http: HttpClient) { }

  public createTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(this._apiUrl, tag);
  }

  public updateTag(tag: Tag): Observable<Tag> {
    return this.http.patch<Tag>(this._apiUrl, tag);
  }

  public deleteTag(tagId: string): Observable<void> {
    return this.http.delete<void>(`${this._apiUrl}/${tagId}`);
  }

  public getTag(tagId: string): Observable<Tag> {
    return this.http.get<Tag>(`${this._apiUrl}/${tagId}`);
  }

  public getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this._apiUrl);
  }
}
