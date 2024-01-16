import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigurationService } from '@core/services/configuration/configuration.service';
import { SectionStepsComponent } from '@sections/section-steps/section-steps.component';
import { ConfigurationServiceStub } from '@shared/testing/stubs/configuration.stub';

describe('SectionStepsComponent', () => {
  let component: SectionStepsComponent;
  let fixture: ComponentFixture<SectionStepsComponent>;
  let configurationServiceStub: ConfigurationServiceStub;

  beforeEach(() => {
    configurationServiceStub = new ConfigurationServiceStub();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionStepsComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ConfigurationService,
          useValue: configurationServiceStub,
        },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SectionStepsComponent);
    component = fixture.componentInstance;
    component.data = {
      name: 'test',
      title: 'test',
      description: 'test',
      foreword: 'test',
      steps: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
