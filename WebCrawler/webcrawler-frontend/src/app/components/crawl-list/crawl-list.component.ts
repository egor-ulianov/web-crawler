import { Component } from '@angular/core';
import { SitesService } from '../../shared/services/sites-service.service';
import { WebSitesPagedRequest } from '../../shared/models/request-models/web-sites-paged-request/web-sites-paged-request';
import { PagedResponse } from '../../shared/models/response-models/paged-response/paged-response';
import { WebsiteShortRepresentation } from '../../shared/models/website-short-representation/website-short-representation';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-crawl-list',
  standalone: true,
  imports: [PaginatorComponent, FormsModule, RouterLink
  ],
  templateUrl: './crawl-list.component.html',
  styleUrl: './crawl-list.component.scss'
})
export class CrawlListComponent {

  //#region Properties

  public websitesCurrentPage: PagedResponse<WebsiteShortRepresentation> | undefined;

  public searchParams: WebSitesPagedRequest = new WebSitesPagedRequest(1, 3, '', '', [], '', '');

  //#endregion Properties

  constructor(private readonly _sitesService: SitesService) { }

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
    this._sitesService.getPagedWebsites(this.searchParams).subscribe((result =>
      {
        this.websitesCurrentPage = result;
      }
    ));
  }

}
