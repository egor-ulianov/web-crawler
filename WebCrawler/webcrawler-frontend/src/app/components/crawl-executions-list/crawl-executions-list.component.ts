import { Component } from '@angular/core';
import { WebsiteCrawlExecutionPlan } from '../../shared/models/website-crawl-execution-plan/website-crawl-execution-plan';
import { PagedResponse } from '../../shared/models/response-models/paged-response/paged-response';
import { WebSitesExecutionsPagedRequest } from '../../shared/models/request-models/web-sites-executions-paged-request/web-sites-executions-paged-request';
import { ExecutionsService } from '../../shared/services/executions.service';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-crawl-executions-list',
  standalone: true,
  imports: [PaginatorComponent, FormsModule, RouterLink],
  templateUrl: './crawl-executions-list.component.html',
  styleUrl: './crawl-executions-list.component.scss'
})
export class CrawlExecutionsListComponent {
  //#region Properties

  public websitesExecutionsCurrentPage: PagedResponse<WebsiteCrawlExecutionPlan> | undefined;

  public searchParams: WebSitesExecutionsPagedRequest = new WebSitesExecutionsPagedRequest(1, 3);

  //#endregion Properties

  constructor(private readonly _executionsService: ExecutionsService) { }

  public async ngOnInit(): Promise<void> {
    this.performSearch();
  }

  public onSearch(): void {
    this.searchParams.pageNumber = 1;
    this.performSearch();
  }

  public onPageChange(page: number): void {
    this.searchParams.pageNumber = page;
    this.performSearch();
  }

  private performSearch(): void {
    this._executionsService.getPagedExecutions(this.searchParams).subscribe((result =>
      {
        this.websitesExecutionsCurrentPage = result;
      }
    ));
  }
}
