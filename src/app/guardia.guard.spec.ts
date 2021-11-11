import { TestBed } from '@angular/core/testing';

import { GuardiaGuard } from './guardia.guard';

describe('GuardiaGuard', () => {
  let guard: GuardiaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardiaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
