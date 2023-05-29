import { TestBed } from '@angular/core/testing';
import { ActionTakenService } from './actionTaken.service';


describe('ActionTakenService', () => {
  let service: ActionTakenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionTakenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
