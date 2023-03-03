import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ContactService } from './contact.service';

describe('ContactService', () => {
  let service: ContactService;
  let controller: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(ContactService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have correct config', () => {
    service.sendMail('name', 'mail', 'message', 'token').subscribe(value => {
      expect(value).toBeTruthy();
    });
    controller.expectOne(
      { method: 'POST', url: '/api/contact/send/' },
    );
  });
});
