import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebSitesPagedRequest } from '../models/request-models/web-sites-paged-request/web-sites-paged-request';
import { PagedResponse } from '../models/response-models/paged-response/paged-response';
import { WebsiteRecord } from '../models/website-record/website-record';
import { WebsiteShortRepresentation } from '../models/website-short-representation/website-short-representation';
import { HttpParamsConverter } from '../helpers/http-params-converter.helper';

@Injectable({
  providedIn: 'root'
})
export class SitesService {
  private readonly apiUrl: string = '/api/sites';

  constructor(private http: HttpClient) { }

  public createWebsite(website: WebsiteRecord): Observable<WebsiteRecord> {
    return this.http.post<WebsiteRecord>(this.apiUrl, website);
  }

  public updateWebsite(website: WebsiteRecord): Observable<WebsiteRecord> {
    return this.http.patch<WebsiteRecord>(`${this.apiUrl}/${website.id}`, website);
  }

  public deleteWebsite(websiteId: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${websiteId}`);
  }

  public getWebsite(websiteId: string): Observable<WebsiteRecord> {
    return this.http.get<WebsiteRecord>(`${this.apiUrl}/${websiteId}`);
  }

  public getPagedWebsites(searchParams: WebSitesPagedRequest): Observable<PagedResponse<WebsiteShortRepresentation>> {
    let httpQueryParams: HttpParams = HttpParamsConverter.convert(searchParams);

    return this.http.get<PagedResponse<WebsiteShortRepresentation>>(this.apiUrl, { params: httpQueryParams });
  }
}