import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DynamicLoadModule } from '@core/directives/dynamic-load/dynamic-load.module';
import { RoutesEnum } from '@core/models/routes.enum';
import { TypePageFields } from '@server/models/contentful-content-types/page';
import { TestComponent } from '@shared/testing/components/test.component';
import { getTranslocoTestingModule } from '@shared/testing/transloco-testing.module';
import { DynamicPageComponent } from './dynamic-page.component';

describe('DynamicPageComponent', () => {
  let component: DynamicPageComponent;
  let fixture: ComponentFixture<DynamicPageComponent>;
  let controller: HttpTestingController;
  let router: Router;

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
    })
      .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    controller = TestBed.inject(HttpTestingController);
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
        sections: [{
          sys: {
            id: '1',
            type: 'Entry',
            createdAt: '2021-03-01T12:00:00.000Z',
            updatedAt: '2021-03-01T12:00:00.000Z',
            revision: 0,
            space: {
              sys: {
                id: '1',
                linkType: 'Space',
                type: 'Link',
              },
            },
            environment: {
              sys: {
                id: 'master',
                linkType: 'Environment',
                type: 'Link',
              },
            },
            contentType: {
              sys: {
                id: 'test-section',
                type: 'Link',
                linkType: 'ContentType',
              },
            },
          },
          metadata: {
            tags: [],
          },
          fields: {},
        }],
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
