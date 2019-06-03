import { TestBed } from '@angular/core/testing';

import { FreteCorreiosService } from './frete-correios.service';

describe('FreteCorreiosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FreteCorreiosService = TestBed.get(FreteCorreiosService);
    expect(service).toBeTruthy();
  });
});
