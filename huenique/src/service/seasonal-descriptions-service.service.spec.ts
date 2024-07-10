import { TestBed } from '@angular/core/testing';

import { SeasonalDescriptionsServiceService } from './seasonal-descriptions-service.service';

describe('SeasonalDescriptionsServiceService', () => {
  let service: SeasonalDescriptionsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeasonalDescriptionsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
