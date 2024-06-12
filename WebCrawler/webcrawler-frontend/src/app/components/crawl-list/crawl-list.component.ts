import { Component, OnInit } from '@angular/core';
import { SitesService } from '../../shared/services/sites-service.service';
import { WebSitesPagedRequest } from '../../shared/models/request-models/web-sites-paged-request/web-sites-paged-request';
import { PagedResponse } from '../../shared/models/response-models/paged-response/paged-response';
import { WebsiteShortRepresentation } from '../../shared/models/website-short-representation/website-short-representation';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowDownAZ, faArrowUpZA, faArrowDown19, faArrowUp91, faArrowDownUpAcrossLine, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { TagsAssignerComponent } from '../../shared/components/tags-assigner/tags-assigner.component';
import { Tag } from '../../shared/models/tag/tag';
import { TagsService } from '../../shared/services/tags.service';

@Component({
  selector: 'app-crawl-list',
  standalone: true,
  imports: [PaginatorComponent, FormsModule, RouterLink, FontAwesomeModule, CommonModule, TagsAssignerComponent],
  templateUrl: './crawl-list.component.html',
  styleUrl: './crawl-list.component.scss'
})
export class CrawlListComponent implements OnInit {

  //#region Properties

  public websitesCurrentPage: PagedResponse<WebsiteShortRepresentation> | undefined;

  public searchParams: WebSitesPagedRequest = new WebSitesPagedRequest(1, 3, '', '', [], '', '');

  public faArrowDownAz: IconDefinition = faArrowDownAZ;
  public faArrowUpZa: IconDefinition = faArrowUpZA;
  public faArrowDown19: IconDefinition = faArrowDown19;
  public faArrowUp91: IconDefinition = faArrowUp91;
  public faArrowDownUpAcrossLine: IconDefinition = faArrowDownUpAcrossLine;

  public tags: Tag[] = [];

  //#endregion Properties

  constructor(private readonly _sitesService: SitesService,
    private readonly _tagsService: TagsService
  ) { }

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

  public onTagsChanged(event: any): void {
    this.searchParams.tags = (event as Tag[]).map(t => t.name);
    this.tags = event as Tag[];
    this.performSearch();
  }

  public onTagClick(tag: string): void {
    if (this.searchParams.tags.includes(tag)) {
      this.searchParams.tags = this.searchParams.tags.filter(t => t !== tag);
    }
    else {
      this.searchParams.tags.push(tag);
    }

    this._tagsService.createTag({ name: tag } as Tag).subscribe((result: Tag) => {
      if (this.tags.find(t => t.id === result.id))
        return;

      this.tags.push(result);
    });

    this.performSearch();
  }

  public urlIcon(column: string): IconDefinition {
    switch (column) {
      case 'url':
        if (this.searchParams.orderColumn == 'url')
          return this.searchParams.orderDirection == 'ASC' ? 
            this.faArrowDownAz : 
            this.faArrowUpZa;
        else
          return this.faArrowDownUpAcrossLine;
      case 'date':
        if (this.searchParams.orderColumn == 'date')
          return this.searchParams.orderDirection == 'ASC' ? 
            this.faArrowDown19 : 
            this.faArrowUp91;
        else
          return this.faArrowDownUpAcrossLine;
      default:
        return this.faArrowDownUpAcrossLine;
    }
  }

  public onSelectForMap(siteId: number): void {
    if (this._sitesService.selectedWebsiteIds.includes(siteId)) {
      this._sitesService.selectedWebsiteIds = this._sitesService.selectedWebsiteIds.filter(id => id !== siteId);
    }
    else {
      this._sitesService.selectedWebsiteIds.push(siteId);
    }
  }

  public onOrderBySelected(column: string): void {
    this.searchParams.orderColumn = column;
    this.searchParams.orderDirection = this.searchParams.orderDirection == 'ASC' ? 'DESC' : 'ASC';
    this.performSearch();
  }

  public isSelectedForMap(siteId: number): boolean {
    return this._sitesService.selectedWebsiteIds.includes(siteId);
  }

  private performSearch(): void {
    this._sitesService.getPagedWebsites(this.searchParams).subscribe((result =>
      {
        this.websitesCurrentPage = result;
      }
    ));
  }

}
