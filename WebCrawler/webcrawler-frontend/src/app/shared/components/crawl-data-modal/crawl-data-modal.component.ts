import { Component, Input, OnInit } from '@angular/core';
import { CrawlDataNode } from '../../models/crawl-data-node/crawl-data-node';
import { MatDialogRef } from '@angular/material/dialog';
import { SitesService } from '../../services/sites-service.service';
import { WebsiteRecord } from '../../models/website-record/website-record';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tag } from '../../models/tag/tag';
import { TagsAssignerComponent } from '../tags-assigner/tags-assigner.component';

@Component({
  selector: 'app-crawl-data-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TagsAssignerComponent],
  templateUrl: './crawl-data-modal.component.html',
  styleUrl: './crawl-data-modal.component.scss'
})
export class CrawlDataModalComponent implements OnInit{

  @Input()
  public crawlData: CrawlDataNode | undefined;

  @Input()
  public outerUrl: string | undefined;

  public sources: WebsiteRecord[];

  public websiteForm: FormGroup | undefined;

  public data: WebsiteRecord | undefined;

  constructor(public dialogRef: MatDialogRef<CrawlDataModalComponent>,
    private readonly _siteService: SitesService,
    private _snackBar: MatSnackBar,
    private _fb: FormBuilder
  ) {
    this.sources = [];
   }

  public ngOnInit(): void {
    this.loadSourceSites();

    if (this.outerUrl)
      this.initData();
  }

  public closeModal(): void {
    this.dialogRef.close();
  }

  public loadSourceSites(): void {
    if (this.crawlData) {
      this.crawlData.startingNodeId.forEach((siteId) => {
        this._siteService.getWebsite(siteId.toString()).subscribe((site) => {
          this.sources.push(site);
        });
      });
    }
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
    this._siteService.createWebsite(this.data).subscribe((result) => {
        this.data = result;
        this._snackBar.open('Website created', 'Close', {
          duration: 2000,
        });
        console.log('Created');
        if (!!result.id)
          this._siteService.selectedWebsiteIds.push(result.id);

        this.dialogRef.close(true);
      });
  }

  public onTagsChanged(tags: any): void {
    if (!this.data) {
      return;
    }

    this.data.tags = tags as Tag[];
  }

  private initData(): void {
    this.data = new WebsiteRecord(null, this.outerUrl ?? '', '', true, '', 1000, []);
    this.initForm();
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

}
