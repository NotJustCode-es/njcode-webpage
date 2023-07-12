import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigurationService } from '@core/services/configuration/configuration.service';
import { SectionExplanationComponent } from '@sections/section-explanation/section-explanation.component';
import { ConfigurationServiceStub } from '@shared/testing/stubs/configuration.stub';
import { createTestEntry } from '@shared/testing/utils/contentful.utils';
import { Asset } from 'contentful';

describe('SectionExplanationComponent', () => {
  let component: SectionExplanationComponent;
  let fixture: ComponentFixture<SectionExplanationComponent>;
  let configurationServiceStub: ConfigurationServiceStub;

  beforeEach(() => {
    configurationServiceStub = new ConfigurationServiceStub();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionExplanationComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ConfigurationService,
          useValue: configurationServiceStub,
        },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SectionExplanationComponent);
    component = fixture.componentInstance;
    component.data = {
      name: 'test',
      explanation: createTestEntry({
        name: 'test',
        title: 'test',
        description: 'test',
        checklist: ['test'],
        workflowImage: null as unknown as Asset,
      }),
      imageOnLeftSide: false,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
