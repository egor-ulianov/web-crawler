import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebsiteCrawlExecutionPlan } from '../models/website-crawl-execution-plan/website-crawl-execution-plan';
import { Observable } from 'rxjs';
import { PagedResponse } from '../models/response-models/paged-response/paged-response';
import { WebSitesExecutionsPagedRequest } from '../models/request-models/web-sites-executions-paged-request/web-sites-executions-paged-request';
import { HttpParamsConverter } from '../helpers/http-params-converter.helper';

@Injectable({
  providedIn: 'root'
})
export class ExecutionsService {

  private readonly apiUrl = '/api/executions';

  constructor(private http: HttpClient) { }

  public createExecution(execution: WebsiteCrawlExecutionPlan): Observable<WebsiteCrawlExecutionPlan> {
    return this.http.post<WebsiteCrawlExecutionPlan>(this.apiUrl, execution);
  }

  public getPagedExecutions(searchParams: WebSitesExecutionsPagedRequest): Observable<PagedResponse<WebsiteCrawlExecutionPlan>> {
    let httpQueryParams: HttpParams = HttpParamsConverter.convert(searchParams);

    return this.http.get<PagedResponse<WebsiteCrawlExecutionPlan>>(this.apiUrl, { params: httpQueryParams });
  }

  public getExecution(id: number): Observable<WebsiteCrawlExecutionPlan> {
    return this.http.get<WebsiteCrawlExecutionPlan>(`${this.apiUrl}/${id}`);
  }
}
