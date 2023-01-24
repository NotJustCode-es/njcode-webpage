import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageLoaderComponent } from '@components/page-loader/page-loader.component';
import { LoadingService } from '@services/loading/loading.service';

describe('PageLoaderComponent', () => {
  let component: PageLoaderComponent;
  let fixture: ComponentFixture<PageLoaderComponent>;
  let loadingService: LoadingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageLoaderComponent],
    })
      .compileComponents();

    loadingService = TestBed.inject(LoadingService);
    fixture = TestBed.createComponent(PageLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a div with class page-loader', () => {
    const { nativeElement } = fixture;
    expect(nativeElement.querySelector('div.page-loader')).toBeTruthy();
  });

  it('should render a div with class done when loading is false', () => {
    loadingService.setLoading(false);
    fixture.detectChanges();
    const { nativeElement } = fixture;
    expect(nativeElement.querySelector('div.done')).toBeTruthy();
  });

  it('should not render a div with class done when loading is false', () => {
    loadingService.setLoading(true);
    fixture.detectChanges();
    const { nativeElement } = fixture;
    expect(nativeElement.querySelector('div.done')).toBeFalsy();
  });
});
