import { Component } from '@angular/core';
import { WebsiteRecord } from '../../shared/models/website-record/website-record';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SitesService } from '../../shared/services/sites-service.service';
import { AbstractControl, ControlContainer, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagedResponse } from '../../shared/models/response-models/paged-response/paged-response';
import { WebsiteCrawlExecutionPlan } from '../../shared/models/website-crawl-execution-plan/website-crawl-execution-plan';
import { WebSitesExecutionsPagedRequest } from '../../shared/models/request-models/web-sites-executions-paged-request/web-sites-executions-paged-request';
import { ExecutionsService } from '../../shared/services/executions.service';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';

@Component({
  selector: 'app-crawl-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, PaginatorComponent, RouterLink],
  templateUrl: './crawl-details.component.html',
  styleUrl: './crawl-details.component.scss'
})
export class CrawlDetailsComponent {

  //#region Properties

  public id: number | undefined;

  public data: WebsiteRecord | undefined;

  public websiteForm: FormGroup | undefined;

  public websitesExecutionsCurrentPage: PagedResponse<WebsiteCrawlExecutionPlan> | undefined;

  public searchParams: WebSitesExecutionsPagedRequest = new WebSitesExecutionsPagedRequest(1, 3);

  //#endregion Properties

  //#region Constructor

  constructor(private _route: ActivatedRoute,
    private readonly _sitesService: SitesService,
    private readonly _executionsService: ExecutionsService,
    private _fb: FormBuilder
  ) {
    this.id = Number(this._route.snapshot.paramMap.get('id'));
    this.searchParams.siteId = this.id;
  }

  //#endregion Constructor

  //#region Methods

  public async ngOnInit(): Promise<void> {
    this.initData();
    this.performSearch();
  }

  public onSave(): void {
    if (!this.data) {
      return;
    }

    this.getDataFromForm();

    if (this.id) {
      this._sitesService.updateWebsite(this.data).subscribe((result) => {
        this.data = result;
        console.log('Updated');
      });
    }
    else {
      this._sitesService.createWebsite(this.data).subscribe((result) => {
        this.data = result;
        console.log('Created');
      });
    }
  }

  public onDelete(): void {
    if (!this.data) {
      return;
    }

    if (this.id) {
      this._sitesService.deleteWebsite(this.id.toString()).subscribe((result) => {
        console.log('Deleted');
      });
    }
  }

  public onPageChange(page: number): void {
    this.searchParams.pageNumber = page;
    this.performSearch();
  }

  private initData(): void {
    if (this.id) {
      this._sitesService.getWebsite(this.id.toString()).subscribe((result =>
        {
          this.data = result;
          console.log(this.data);
          this.initForm();
        }
      ));
    }
    else {
      this.data = new WebsiteRecord(null, '', '', true, '', 1000, []);
      this.initForm();
    }
  }

  private initForm(): void {
    this.websiteForm = this._fb.group({
      url: [this.data?.url],
      label: [this.data?.label],
      isActive: [this.data?.isActive],
      boundaryRegExp: [this.data?.boundaryRegExp],
      periodicity: [this.data?.periodicity]
    });
  }

  private getDataFromForm(): void {
    if (!this.data) {
      return;
    }

    this.data.url = this.websiteForm?.get('url')?.value;
    this.data.label = this.websiteForm?.get('label')?.value;
    this.data.isActive = this.websiteForm?.get('isActive')?.value;
    this.data.boundaryRegExp = this.websiteForm?.get('boundaryRegExp')?.value;
    this.data.periodicity = this.websiteForm?.get('periodicity')?.value;
  }

  private performSearch(): void {
    if (!this.searchParams.siteId) {
      return;
    }

    this._executionsService.getPagedExecutions(this.searchParams).subscribe((result =>
      {
        this.websitesExecutionsCurrentPage = result;
      }
    ));
  }

  //#endregion Methods
}
