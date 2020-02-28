import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SymbolModel } from '../models/symbol-model';
import { CandleResolution } from '../models/candle-resolution.enum';
import { Observable } from 'rxjs';
import { CandleModel } from '../models/candle-model';
import { MetricType } from '../models/metric-type.enum';
import { MetricModel } from '../models/metric-model';

@Injectable({
  providedIn: 'root'
})
export class FinnhubQuoteService {

  private baseUrl = environment.url;
  private candleUrl = 'stock/candle?symbol=';
  private metricUrl = '/stock/metric?symbol=';
  private token = environment.token;

constructor(private http: HttpClient) { }

public getCandle(symbol: SymbolModel, res: CandleResolution, startTimestamp: string): Observable<CandleModel> {
  const TODAY = new Date(Date.now());
  const TIMESTAMP = Math.floor(TODAY.getTime() / 1000);
  return this.http.get<CandleModel>(this.baseUrl + this.candleUrl + symbol.symbol + '&resolution='
          + res + '&from=' + startTimestamp + '&to=' + TIMESTAMP + '&token=' + this.token);
}

public getMetrics(symbol: SymbolModel, metricType: MetricType): Observable<MetricModel> {
  return this.http.get<MetricModel>(this.baseUrl + this.metricUrl + symbol.symbol + '&metric=' + metricType + '&token=' + this.token);
}

}
