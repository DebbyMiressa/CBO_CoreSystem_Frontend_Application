import { TestBed } from '@angular/core/testing';

import { DchequeService } from './dcheque.service';

describe('CIPMService', () => {
  let service: DchequeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DchequeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
