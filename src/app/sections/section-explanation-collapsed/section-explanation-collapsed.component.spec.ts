import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionExplanationCollapsedComponent } from '@sections/section-explanation-collapsed/section-explanation-collapsed.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
