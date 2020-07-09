import { TestBed } from '@angular/core/testing';

import { RouteguardCoursierService } from './routeguard-coursier.service';

describe('RouteguardCoursierService', () => {
  let service: RouteguardCoursierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteguardCoursierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
