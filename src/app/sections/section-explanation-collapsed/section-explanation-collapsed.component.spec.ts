import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionExplanationCollapsedComponent } from '@sections/section-explanation-collapsed/section-explanation-collapsed.component';
import { createTestEntry } from '@shared/testing/utils/contentful.utils';

describe('SectionExplanationCollapsedComponent', () => {
  let component: SectionExplanationCollapsedComponent;
  let fixture: ComponentFixture<SectionExplanationCollapsedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionExplanationCollapsedComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SectionExplanationCollapsedComponent);
    component = fixture.componentInstance;
    component.data = {
      name: 'test',
      title: 'test',
      entries: [createTestEntry({
        name: 'test',
        title: 'test',
        body: 'test',
      })],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
