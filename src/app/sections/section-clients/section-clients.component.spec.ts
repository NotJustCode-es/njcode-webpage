import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigurationService } from '@core/services/configuration/configuration.service';
import { SectionClientsComponent } from '@sections/section-clients/section-clients.component';
import { AssetsService } from '@services/assets/assets.service';
import { ConfigurationServiceStub } from '@shared/testing/stubs/configuration.stub';

describe('SectionClientsComponent', () => {
  let component: SectionClientsComponent;
  let assetsService: AssetsService;
  let fixture: ComponentFixture<SectionClientsComponent>;
  let configurationServiceStub: ConfigurationServiceStub;

  beforeEach(() => {
    configurationServiceStub = new ConfigurationServiceStub();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionClientsComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ConfigurationService,
          useValue: configurationServiceStub,
        },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SectionClientsComponent);
    component = fixture.componentInstance;
    assetsService = TestBed.inject(AssetsService);
    component.data = {
      icon: 'test',
      name: 'test',
      title: 'test',
      clientCards: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getIconSolidPath', () => {
    const spySubscribable = spyOn(assetsService, 'getIconSolidPath');
    component.getIconPath(component.data.icon);
    expect(spySubscribable).toHaveBeenCalled();
  });
});
