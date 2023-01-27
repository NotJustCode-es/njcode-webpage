import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionHighlightsComponent } from '@sections/section-highlights/section-highlights.component';

describe('SectionHighlightsComponent', () => {
  let component: SectionHighlightsComponent;
  let fixture: ComponentFixture<SectionHighlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionHighlightsComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SectionHighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#getIconPath', () => {
    it('should return icon path', () => {
      const icon = 'icon';
      expect(component.getIconPath(icon)).toEqual(`${component.iconsPath}/${icon}.svg`);
    });
  });
});
