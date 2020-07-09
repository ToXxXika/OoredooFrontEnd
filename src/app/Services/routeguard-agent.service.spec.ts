import { TestBed } from '@angular/core/testing';

import { RouteguardAgentService } from './routeguard-agent.service';

describe('RouteguardAgentService', () => {
  let service: RouteguardAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteguardAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
