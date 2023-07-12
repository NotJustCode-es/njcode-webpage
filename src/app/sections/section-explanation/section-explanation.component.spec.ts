import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionExplanationComponent } from '@sections/section-explanation/section-explanation.component';
import { createTestEntry } from '@shared/testing/utils/contentful.utils';
import { Asset } from 'contentful';

describe('SectionExplanationComponent', () => {
  let component: SectionExplanationComponent;
  let fixture: ComponentFixture<SectionExplanationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionExplanationComponent],
      imports: [HttpClientTestingModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SectionExplanationComponent);
    component = fixture.componentInstance;
    component.data = {
      name: 'test',
      explanation: createTestEntry({
        name: 'test',
        title: 'test',
        description: 'test',
        checklist: ['test'],
        workflowImage: null as unknown as Asset,
      }),
      imageOnLeftSide: false,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
