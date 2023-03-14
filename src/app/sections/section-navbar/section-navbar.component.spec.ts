import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigurationService } from '@core/services/configuration/configuration.service';
import { SectionNavbarComponent } from '@sections/section-navbar/section-navbar.component';
import { getTranslocoTestingModule } from '@shared/testing/transloco-testing.module';

describe('SectionNavbarComponent', () => {
  let component: SectionNavbarComponent;
  let fixture: ComponentFixture<SectionNavbarComponent>;
  let configurationServiceStub: ConfigurationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SectionNavbarComponent,
      ],
      imports: [
        getTranslocoTestingModule(),
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: ConfigurationService,
          useClass: configurationServiceStub,
        },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionNavbarComponent);
    component = fixture.componentInstance;
    component.data = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#setActiveLang', () => {
    it('should set active language', () => {
      component.setActiveLang('es');
      expect(component.activeLang).toEqual('es');
    });
  });
});
