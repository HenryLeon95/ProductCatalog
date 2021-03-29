import { TestBed, async, inject } from '@angular/core/testing';

import { AuthClientGuard } from './auth-client.guard';

describe('AuthClientGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthClientGuard]
    });
  });

  it('should ...', inject([AuthClientGuard], (guard: AuthClientGuard) => {
    expect(guard).toBeTruthy();
  }));
});
