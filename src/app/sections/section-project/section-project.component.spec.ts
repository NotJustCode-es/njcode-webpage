import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionProjectComponent } from '@sections/section-project/section-project.component';

describe('SectionProjectComponent', () => {
  let component: SectionProjectComponent;
  let fixture: ComponentFixture<SectionProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionProjectComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SectionProjectComponent);
    component = fixture.componentInstance;
    component.data = {
      imageOnLeftSide: true,
      title: 'test',
      name: 'test',
      needsTitle: 'test',
      needsText: 'test',
      resultTitle: 'test',
      resultText: 'test',
      deedsTitle: 'test',
      deedsText: 'test',
      badgesTitle: 'test',
      badges: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
