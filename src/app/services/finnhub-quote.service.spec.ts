/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FinnhubQuoteService } from './finnhub-quote.service';

describe('Service: FinnhubQuote', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinnhubQuoteService]
    });
  });

  it('should ...', inject([FinnhubQuoteService], (service: FinnhubQuoteService) => {
    expect(service).toBeTruthy();
  }));
});
