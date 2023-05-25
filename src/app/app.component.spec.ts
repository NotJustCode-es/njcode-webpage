import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieBannerModule } from '@components/cookie-banner/cookie-banner.module';
import { PageLoaderModule } from '@components/page-loader/page-loader.module';
import { getTranslocoTestingModule } from '@shared/testing/transloco-testing.module';
import { AppComponent } from 'src/app/app.component';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        getTranslocoTestingModule(),
        RouterTestingModule,
        PageLoaderModule,
        CookieBannerModule,
      ],
      declarations: [
        AppComponent,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should render app-page-loader', () => {
    const { nativeElement } = fixture;
    expect(nativeElement.querySelector('app-page-loader')).toBeTruthy();
  });
});
