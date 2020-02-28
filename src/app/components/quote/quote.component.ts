import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QuoteModel } from 'src/app/models/quote-model';
import { ExchangeModel } from 'src/app/models/exchange-model';
import { SymbolModel } from 'src/app/models/symbol-model';
import { CandleModel } from 'src/app/models/candle-model';
import { CandleResolution } from 'src/app/models/candle-resolution.enum';
import { FinnhubQuoteService } from 'src/app/services/finnhub-quote.service';
import { MetricModel } from 'src/app/models/metric-model';
import { MetricType } from 'src/app/models/metric-type.enum';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {

  @Input() quote: QuoteModel;
  @Input() symbol: SymbolModel;
  @Input() exchange: ExchangeModel;
  percentageChange: string;
  difference: string;
  change: number;
  candleData: CandleModel;
  metric: MetricModel;
  metricsLoading = true;

  constructor(private quoteService: FinnhubQuoteService) { }

  ngOnInit() {
    this.calculateChange();
    this.getCandle(CandleResolution.Daily);
    this.getMetrics(MetricType.margin);
  }

  private calculateChange(): void {
    const CURRENT_PRICE = this.quote.c;
    const OPENING_PRICE = this.quote.o;
    if (CURRENT_PRICE > OPENING_PRICE) {
      const PERCENT_CHANGED = (CURRENT_PRICE / OPENING_PRICE * 100) - 100;
      this.percentageChange = `+${PERCENT_CHANGED.toFixed(2)}%`;
      this.difference = `(+${(CURRENT_PRICE - OPENING_PRICE).toFixed(2)})`;
      this.change = 1;
    } else if (CURRENT_PRICE < OPENING_PRICE) {
      const PERCENT_CHANGED = (OPENING_PRICE / CURRENT_PRICE * 100) - 100;
      this.percentageChange = `-${PERCENT_CHANGED.toFixed(2)}%`;
      this.difference = `(-${(OPENING_PRICE - CURRENT_PRICE).toFixed(2)})`;
      this.change = 2;
    } else {
      this.percentageChange = '0%';
      this.difference = '';
      this.change = 0;
    }
  }

  private getCandle(resolution: CandleResolution): void {
    const START_TIMESTAMP = this.calculateTimeStamp(resolution);
    this.quoteService.getCandle(this.symbol, resolution, START_TIMESTAMP)
      .subscribe((res: CandleModel) => {
        this.candleData = res;
      }, err => {
        console.log(err);
      });
  }

  private calculateTimeStamp(res: CandleResolution): string {
    const DATE = new Date(Date.now());
    const YEAR = DATE.getFullYear();
    const MONTH = DATE.getMonth();
    const DAY = DATE.getDate();
    switch (res) {
      case CandleResolution.Daily:
        DATE.setFullYear(YEAR - 1);
        return Math.floor(DATE.getTime() / 1000).toString();
    }
  }

  public getMetrics(metricType: MetricType): void {
    this.metricsLoading = true;
    this.quoteService.getMetrics(this.symbol, metricType)
      .subscribe((res: MetricModel) => {
        this.metric = res;
        this.metricsLoading = false;
      }, err => {
        console.log(err);
      });
  }

}