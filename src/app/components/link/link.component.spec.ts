import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LinkComponent } from '@components/link/link.component';
import { TranslocoService } from '@ngneat/transloco';
import { getTranslocoTestingModule } from '@shared/testing/transloco-testing.module';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;
  let translocoService: TranslocoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkComponent],
      imports: [
        getTranslocoTestingModule(),
        RouterTestingModule,
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(LinkComponent);
    translocoService = TestBed.inject(TranslocoService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('#i18nBasedHref', () => {
    it('should return i18n based href on default i18n true', () => {
      const activeLang = translocoService.getActiveLang();
      component.href = 'test';
      expect(component.i18nBasedHref).toEqual(`/${activeLang}/test`);
    });

    it('should return href when i18n is false', () => {
      component.href = 'test';
      component.i18n = false;
      expect(component.i18nBasedHref).toEqual('test');
    });
  });
});
