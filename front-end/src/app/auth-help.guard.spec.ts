import { TestBed, async, inject } from '@angular/core/testing';

import { AuthHelpGuard } from './auth-help.guard';

describe('AuthHelpGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthHelpGuard]
    });
  });

  it('should ...', inject([AuthHelpGuard], (guard: AuthHelpGuard) => {
    expect(guard).toBeTruthy();
  }));
});
