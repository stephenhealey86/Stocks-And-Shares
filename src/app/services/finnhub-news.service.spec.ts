/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FinnhubNewsService } from './finnhub-news.service';

describe('Service: FinnhubNews', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinnhubNewsService]
    });
  });

  it('should ...', inject([FinnhubNewsService], (service: FinnhubNewsService) => {
    expect(service).toBeTruthy();
  }));
});
