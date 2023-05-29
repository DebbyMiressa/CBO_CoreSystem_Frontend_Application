import { TestBed } from '@angular/core/testing';

import { FraudCategoryService } from './fraudCategory.service';

describe('FraudCategoryService', () => {
  let service: FraudCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FraudCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
