import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlDetailsComponent } from './crawl-details.component';

describe('CrawlDetailsComponent', () => {
  let component: CrawlDetailsComponent;
  let fixture: ComponentFixture<CrawlDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrawlDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrawlDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
