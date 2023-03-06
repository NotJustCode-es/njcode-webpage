import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionHighlightsComponent } from '@sections/section-highlights/section-highlights.component';
import { AssetsService } from '@services/assets/assets.service';

describe('SectionHighlightsComponent', () => {
  let component: SectionHighlightsComponent;
  let service: AssetsService;
  let fixture: ComponentFixture<SectionHighlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionHighlightsComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SectionHighlightsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AssetsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getIconSolidPath', () => {
    const icon = 'check';
    const spySubscribable = spyOn(service, 'getIconSolidPath');
    component.getIconPath(icon);
    expect(spySubscribable).toHaveBeenCalled();
  });
});
