import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookieBannerComponent } from '@components/cookie-banner/cookie-banner.component';
import { LinkModule } from '@components/link/link.module';
import { getTranslocoTestingModule } from '@shared/testing/transloco-testing.module';

describe('CookieBannerComponent', () => {
  let component: CookieBannerComponent;
  let fixture: ComponentFixture<CookieBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CookieBannerComponent],
      imports: [
        getTranslocoTestingModule(),
        LinkModule,
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CookieBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
