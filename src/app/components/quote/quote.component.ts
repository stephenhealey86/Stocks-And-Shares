import { Component, OnInit, Input } from '@angular/core';
import { QuoteModel } from 'src/app/models/quote-model';
import { ExchangeModel } from 'src/app/models/exchange-model';
import { SymbolModel } from 'src/app/models/symbol-model';

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

  constructor() { }

  ngOnInit() {
    this.calculateChange();
  }

  calculateChange(): void {
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

}
