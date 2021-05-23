import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterGuard } from './register.guard';

describe('RegisterGuard', () => {
  let guard: RegisterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ]
    });
    guard = TestBed.inject(RegisterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
