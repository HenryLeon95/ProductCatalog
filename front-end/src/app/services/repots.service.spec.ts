import { TestBed } from '@angular/core/testing';

import { RepotsService } from './repots.service';

describe('RepotsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepotsService = TestBed.get(RepotsService);
    expect(service).toBeTruthy();
  });
});
