import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkComponent } from '@components/link/link.component';
import { getTranslocoTestingModule } from '@shared/testing/transloco-testing.module';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkComponent],
      imports: [
        getTranslocoTestingModule(),
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('#i18nBasedHref', () => {
    it('should return i18n based href on default i18n true', () => {
      component.href = 'test';
      expect(component.i18nBasedHref).toEqual('/en/test');
    });

    it('should return href when i18n is false', () => {
      component.href = 'test';
      component.i18n = false;
      expect(component.i18nBasedHref).toEqual('/test');
    });
  });
});
