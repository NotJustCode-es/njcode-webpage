import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigurationService } from '@core/services/configuration/configuration.service';
import { SectionReviewComponent } from '@sections/section-review/section-review.component';
import { ConfigurationServiceStub } from '@shared/testing/stubs/configuration.stub';

describe('SectionReviewComponent', () => {
  let component: SectionReviewComponent;
  let fixture: ComponentFixture<SectionReviewComponent>;
  let configurationServiceStub: ConfigurationServiceStub;

  beforeEach(() => {
    configurationServiceStub = new ConfigurationServiceStub();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionReviewComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ConfigurationService,
          useValue: configurationServiceStub,
        },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SectionReviewComponent);
    component = fixture.componentInstance;
    component.data = {
      name: 'test',
      cards: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
