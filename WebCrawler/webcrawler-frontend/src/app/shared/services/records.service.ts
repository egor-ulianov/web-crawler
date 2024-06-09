import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrawlRecordsRequest } from '../models/request-models/crawl-records-request/crawl-records-request';
import { HttpParamsConverter } from '../helpers/http-params-converter.helper';
import { Observable } from 'rxjs';
import { CrawlData } from '../models/crawl-data/crawl-data';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  private readonly apiUrl: string = '/api/records';

  constructor(private http: HttpClient) { }

  public getRecordsFromSourceNodes(searchParams: CrawlRecordsRequest): Observable<Array<CrawlData>> {
    const httpQueryParams: HttpParams = HttpParamsConverter.convert(searchParams);
    
    return this.http.get<Array<CrawlData>>(this.apiUrl, { params: httpQueryParams });
  }

}
