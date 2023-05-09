import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigurationService } from '@core/services/configuration/configuration.service';
import { SectionHighlightsComponent } from '@sections/section-highlights/section-highlights.component';
import { AssetsService } from '@services/assets/assets.service';
import { ConfigurationServiceStub } from '@shared/testing/stubs/configuration.stub';

describe('SectionHighlightsComponent', () => {
  let component: SectionHighlightsComponent;
  let assetsService: AssetsService;
  let fixture: ComponentFixture<SectionHighlightsComponent>;
  let configurationServiceStub: ConfigurationServiceStub;

  beforeEach(() => {
    configurationServiceStub = new ConfigurationServiceStub();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionHighlightsComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ConfigurationService,
          useValue: configurationServiceStub,
        },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SectionHighlightsComponent);
    component = fixture.componentInstance;
    assetsService = TestBed.inject(AssetsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getIconLinealPath', () => {
    const icon = 'check';
    const spySubscribable = spyOn(assetsService, 'getIconLinealPath');
    component.getIconPath(icon);
    expect(spySubscribable).toHaveBeenCalled();
  });
});
