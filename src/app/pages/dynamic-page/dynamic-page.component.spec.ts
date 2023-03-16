import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DynamicLoadModule } from '@core/directives/dynamic-load/dynamic-load.module';
import { RoutesEnum } from '@core/models/routes.enum';
import { ConfigurationService } from '@core/services/configuration/configuration.service';
import { DynamicPageComponent } from '@pages/dynamic-page/dynamic-page.component';
import { TypePageFields } from '@server/models/contentful-content-types/page';
import { MetadataService } from '@services/metadata/metadata.service';
import { TestComponent } from '@shared/testing/components/test.component';
import { ConfigurationServiceStub } from '@shared/testing/stubs/configuration.stub';
import { getTranslocoTestingModule } from '@shared/testing/transloco-testing.module';
import { createTestEntry } from '@shared/testing/utils/contentful.utils';

describe('DynamicPageComponent', () => {
  let component: DynamicPageComponent;
  let fixture: ComponentFixture<DynamicPageComponent>;
  let controller: HttpTestingController;
  let router: Router;
  let metadataService: MetadataService;
  let configurationServiceStub: ConfigurationServiceStub;

  beforeEach(() => {
    configurationServiceStub = new ConfigurationServiceStub();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DynamicPageComponent,
      ],
      imports: [
        getTranslocoTestingModule(),
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{
          path: RoutesEnum.NotFound,
          component: TestComponent,
        }]),
        DynamicLoadModule,
      ],
      providers: [
        {
          provide: ConfigurationService,
          useValue: configurationServiceStub,
        },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    controller = TestBed.inject(HttpTestingController);
    metadataService = TestBed.inject(MetadataService);
    fixture = TestBed.createComponent(DynamicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#getSections', () => {
    it('should not render if there are no sections', () => {
      const { nativeElement } = fixture;
      const response = {
        items: [{
          fields: {
            sections: [],
          },
        }],
      };
      const req = controller.expectOne(() => true);
      req.flush(response);
      fixture.detectChanges();
      expect(nativeElement.querySelector('app-dynamic-load')).toBeFalsy();
    });

    it('should call MetadataService#setMetadata', () => {
      const spySetMetadata = spyOn(metadataService, 'setMetadata');
      const response = {
        items: [{
          fields: {
            metadata: [],
          },
        }],
      };
      const req = controller.expectOne(() => true);
      req.flush(response);
      expect(spySetMetadata).toHaveBeenCalled();
    });

    it('should redirect to RoutesEnum.NotFound on getPage error', () => {
      const spyNavigate = spyOn(router, 'navigate');
      const response = new ProgressEvent('error');
      const req = controller.expectOne(() => true);
      req.error(response, { status: 404, statusText: 'Not Found' });
      expect(spyNavigate).toHaveBeenCalledWith([RoutesEnum.NotFound]);
    });
  });

  describe('#mapSectionsAndDataFromPage', () => {
    it('should map sections if there are sections to map', () => {
      const response: TypePageFields = {
        slug: '/',
        sections: [
          createTestEntry({}),
        ],
      };
      const expectedMappedSections = [{
        id: 'test-section',
        data: {},
      }];
      expect(component.mapSectionsAndDataFromPage(response)).toEqual(expectedMappedSections);
    });

    it('should not map sections if there are no sections to map', () => {
      const response: TypePageFields = {
        slug: '/',
      };
      expect(component.mapSectionsAndDataFromPage(response)).toEqual([]);
    });
  });
});
