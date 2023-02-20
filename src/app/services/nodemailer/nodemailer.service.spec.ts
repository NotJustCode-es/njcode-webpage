import { TestBed } from '@angular/core/testing';

import { NodemailerService } from './nodemailer.service';

describe('NodemailerService', () => {
  let service: NodemailerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodemailerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
