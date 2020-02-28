import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExchangeModel } from '../models/exchange-model';
import { SymbolModel } from '../models/symbol-model';
import { QuoteModel } from '../models/quote-model';
import { CandleModel } from '../models/candle-model';
import { CandleResolution } from '../models/candle-resolution.enum';

@Injectable({
  providedIn: 'root'
})
export class FinnhubPricesService {

  private baseUrl = environment.url;
  private exchangeUrl = 'stock/exchange?token=';
  private symbolUrl = 'stock/symbol?exchange=';
  private quoteUrl = 'quote?symbol=';
  private token = environment.token;

constructor(private http: HttpClient) { }

public getExchanges(): Observable<Array<ExchangeModel>> {
  return this.http.get<Array<ExchangeModel>>(this.baseUrl + this.exchangeUrl + this.token);
}

public getSymbol(exchange: ExchangeModel): Observable<Array<SymbolModel>> {
  return this.http.get<Array<SymbolModel>>(this.baseUrl + this.symbolUrl + exchange.code + '&token=' + this.token);
}

public getQuote(symbol: SymbolModel): Observable<QuoteModel> {
  return this.http.get<QuoteModel>(this.baseUrl + this.quoteUrl + symbol.symbol + '&token=' + this.token);
}
}
