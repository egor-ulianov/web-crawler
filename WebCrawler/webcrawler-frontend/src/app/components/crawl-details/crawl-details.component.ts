import { Component } from '@angular/core';
import { WebsiteRecord } from '../../shared/models/website-record/website-record';
import { ActivatedRoute } from '@angular/router';
import { SitesService } from '../../shared/services/sites-service.service';
import { AbstractControl, ControlContainer, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crawl-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './crawl-details.component.html',
  styleUrl: './crawl-details.component.scss'
})
export class CrawlDetailsComponent {

  //#region Properties

  public id: number | undefined;

  public data: WebsiteRecord | undefined;

  public websiteForm: FormGroup | undefined;

  //#endregion Properties

  //#region Constructor

  constructor(private _route: ActivatedRoute,
    private readonly _sitesService: SitesService,
    private _fb: FormBuilder
  ) {
    this.id = Number(this._route.snapshot.paramMap.get('id'));
  }

  //#endregion Constructor

  //#region Methods

  public async ngOnInit(): Promise<void> {
    this.initData();
  }

  public onSave(): void {
    if (!this.data) {
      return;
    }

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

  //#endregion Methods
}
