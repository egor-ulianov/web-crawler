import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlDataModalComponent } from './crawl-data-modal.component';

describe('CrawlDataModalComponent', () => {
  let component: CrawlDataModalComponent;
  let fixture: ComponentFixture<CrawlDataModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrawlDataModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrawlDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
