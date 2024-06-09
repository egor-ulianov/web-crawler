import { Component, OnInit } from '@angular/core';
import { WebsiteRecord } from '../../shared/models/website-record/website-record';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { SitesService } from '../../shared/services/sites-service.service';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { PagedResponse } from '../../shared/models/response-models/paged-response/paged-response';
import { WebsiteCrawlExecutionPlan } from '../../shared/models/website-crawl-execution-plan/website-crawl-execution-plan';
import { WebSitesExecutionsPagedRequest } from '../../shared/models/request-models/web-sites-executions-paged-request/web-sites-executions-paged-request';
import { ExecutionsService } from '../../shared/services/executions.service';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { Tag } from '../../shared/models/tag/tag';
import { TagsAssignerComponent } from '../../shared/components/tags-assigner/tags-assigner.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crawl-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, PaginatorComponent, RouterLink, TagsAssignerComponent, RouterModule, CommonModule],
  templateUrl: './crawl-details.component.html',
  styleUrl: './crawl-details.component.scss'
})
export class CrawlDetailsComponent implements OnInit {

  //#region Properties

  public id: number | undefined;

  public data: WebsiteRecord | undefined;

  public websiteForm: FormGroup | undefined;

  public websitesExecutionsCurrentPage: PagedResponse<WebsiteCrawlExecutionPlan> | undefined;

  public searchParams: WebSitesExecutionsPagedRequest = new WebSitesExecutionsPagedRequest(1, 3);

  //#endregion Properties

  //#region Constructor

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private readonly _sitesService: SitesService,
    private readonly _executionsService: ExecutionsService,
    private _snackBar: MatSnackBar,
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

    if (this.websiteForm?.invalid) {
      this._snackBar.open('Form is invalid', 'Close', {
        duration: 2000,
      });
      return;
    }

    this.getDataFromForm();

    if (this.id) {
      this._sitesService.updateWebsite(this.data).subscribe((result) => {
        this.data = result;
        this._snackBar.open('Website updated', 'Close', {
          duration: 2000,
        });
        console.log('Updated');
      });
    }
    else {
      this._sitesService.createWebsite(this.data).subscribe((result) => {
        this.data = result;
        this._snackBar.open('Website created', 'Close', {
          duration: 2000,
        });
        console.log('Created');
      });
    }
  }

  public onDelete(): void {
    if (!this.data) {
      return;
    }

    if (this.id) {
      this._sitesService.deleteWebsite(this.id.toString()).subscribe(() => {
        console.log('Deleted');
        this._snackBar.open('Website deleted', 'Close', {
          duration: 2000,
        });
        this._router.navigate(['/crawl-list']);
      });
    }
  }

  public onPageChange(page: number): void {
    this.searchParams.pageNumber = page;
    this.performSearch();
  }

  public onTagsChanged(tags: any): void {
    if (!this.data) {
      return;
    }

    this.data.tags = tags as Tag[];
  }

  public onStartCrawl(): void {
    if (!this.data || !this.data.id) {
      return;
    }

    this._executionsService.createExecution(new WebsiteCrawlExecutionPlan(null, this.data.id, new Date(), 'Pending', this.data))
      .subscribe(() => {
        console.log('Crawl started');
        this._snackBar.open('Crawl started', 'Close', {
          duration: 2000,
        });
        this.performSearch();
      });
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
      url: [this.data?.url, [Validators.required, Validators.pattern('https?://.+')]],
      label: [this.data?.label, Validators.required],
      isActive: [this.data?.isActive],
      boundaryRegExp: [this.data?.boundaryRegExp, this.regExpValidator()],
      periodicity: [this.data?.periodicity, [Validators.required, Validators.min(100)]]
    });
  }

  private regExpValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      try {
        new RegExp(control.value);
        return null;  // If no error is thrown, the RegExp is valid
      } catch {
        return { 'invalidRegExp': { value: control.value } };  // If an error is thrown, the RegExp is invalid
      }
    };
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
