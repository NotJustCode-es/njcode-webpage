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
      linkText: 'test',
      link: createTestEntry({
        name: 'test',
        title: 'test',
        href: 'test',
        external: true,
        targetBlank: true,
      }),
      entries: [createTestEntry({
        name: 'test',
        title: 'test',
        text: 'test',
      })],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
