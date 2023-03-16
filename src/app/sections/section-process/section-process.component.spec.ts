import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigurationService } from '@core/services/configuration/configuration.service';
import { SectionProcessComponent } from '@sections/section-process/section-process.component';
import { AssetsService } from '@services/assets/assets.service';
import { ConfigurationServiceStub } from '@shared/testing/stubs/configuration.stub';

describe('SectionProcessComponent', () => {
  let component: SectionProcessComponent;
  let fixture: ComponentFixture<SectionProcessComponent>;
  let service: AssetsService;
  let configurationServiceStub: ConfigurationServiceStub;

  beforeEach(() => {
    configurationServiceStub = new ConfigurationServiceStub();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionProcessComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ConfigurationService,
          useValue: configurationServiceStub,
        },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SectionProcessComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AssetsService);
    component.data = {
      name: 'test',
      question: 'test',
      answer: 'test',
    };
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
