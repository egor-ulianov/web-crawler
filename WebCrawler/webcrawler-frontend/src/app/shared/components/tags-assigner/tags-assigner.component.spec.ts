import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsAssignerComponent } from './tags-assigner.component';

describe('TagsAssignerComponent', () => {
  let component: TagsAssignerComponent;
  let fixture: ComponentFixture<TagsAssignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagsAssignerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagsAssignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
