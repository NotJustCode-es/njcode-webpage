import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ContentfulService } from '@core/services/contentful/contentful.service';
import { TypePageFields } from '@server/models/contentful-content-types/page';

describe('ContentfulService', () => {
  let service: ContentfulService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(ContentfulService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getPage', () => {
    it('should return empty object if no items', () => {
      const response = {
        items: [],
      };
      service.getPage('test', 'en-US').subscribe(page => {
        expect(page).toEqual({} as TypePageFields);
      });
      controller.expectOne(() => true).flush(response);
    });
  });
});
