import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlMapComponent } from './crawl-map.component';

describe('CrawlMapComponent', () => {
  let component: CrawlMapComponent;
  let fixture: ComponentFixture<CrawlMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrawlMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrawlMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
