import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlExecutionsListComponent } from './crawl-executions-list.component';

describe('CrawlExecutionsListComponent', () => {
  let component: CrawlExecutionsListComponent;
  let fixture: ComponentFixture<CrawlExecutionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrawlExecutionsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrawlExecutionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
