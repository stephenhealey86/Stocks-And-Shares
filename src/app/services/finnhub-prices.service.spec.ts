/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FinnhubPricesService } from './finnhub-prices.service';

describe('Service: FinnhubPrices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinnhubPricesService]
    });
  });

  it('should ...', inject([FinnhubPricesService], (service: FinnhubPricesService) => {
    expect(service).toBeTruthy();
  }));
});
