import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionHighlightsComponent } from './section-highlights.component';

describe('SectionHighlightsComponent', () => {
  let component: SectionHighlightsComponent;
  let fixture: ComponentFixture<SectionHighlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionHighlightsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionHighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
