import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigurationService } from '@core/services/configuration/configuration.service';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { ConfigurationServiceStub } from '@shared/testing/stubs/configuration.stub';
import { getTranslocoTestingModule } from '@shared/testing/transloco-testing.module';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let configurationServiceStub: ConfigurationServiceStub;

  beforeEach(() => {
    configurationServiceStub = new ConfigurationServiceStub();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        getTranslocoTestingModule(),
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [
        NotFoundComponent,
      ],
      providers: [
        {
          provide: ConfigurationService,
          useValue: configurationServiceStub,
        },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
