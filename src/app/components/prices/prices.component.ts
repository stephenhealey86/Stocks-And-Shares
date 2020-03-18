import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { ExchangeModel } from 'src/app/models/exchange-model';
import { FinnhubPricesService } from 'src/app/services/finnhub-prices.service';
import { SymbolModel } from 'src/app/models/symbol-model';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { QuoteModel } from 'src/app/models/quote-model';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit, AfterContentInit {

  exchanges: Array<ExchangeModel>;
  exchange = {} as ExchangeModel;
  symbols = [] as Array<SymbolModel>;
  queryField: FormControl = new FormControl({value: '', disabled: true});
  searchResults = [] as Array<SymbolModel>;
  topExchanges = [] as Array<ExchangeModel>;
  symbol: SymbolModel;
  quote: QuoteModel;

  topExchangesList = [
    'US',
    'L',
    'SS',
    'HK',
    'T'
  ];

  constructor(private pricesService: FinnhubPricesService) { }

  ngOnInit() {
    this.getExchanges();
    this.initialiseSearchBar();
  }

  ngAfterContentInit(): void {
    window.addEventListener('resize', () => {
      this.detectScreenSize();
    });
    setTimeout(() => {
      this.detectScreenSize();
    }, 500);
  }

  private detectScreenSize() {
    if (window.innerWidth < 550) {
      const DROP_DOWN_DIV = document.getElementById('navbarSupportedContent') as HTMLDivElement;
      if (DROP_DOWN_DIV !== null && this.exchange.name === undefined) {
        DROP_DOWN_DIV.classList.add('show');
      }
    }
  }

  private getExchanges(): void {
    this.pricesService.getExchanges()
    .subscribe((res: Array<ExchangeModel>) => {
      this.exchanges = res.sort((a, b) => {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
    });
      this.getTopResults();
    }, err => {
      console.log(err);
    });
  }

  private initialiseSearchBar(): void {
    this.queryField.valueChanges
    .pipe(debounceTime(300))
    .subscribe(query => {
       this.searchResults = this.symbols.filter(s => {
         const des = s.description.toLowerCase();
         const sym = s.symbol.toLowerCase();
         const qu = query.toLowerCase();
         return des.includes(qu) || sym.includes(qu);
       });
       const LENGTH = (this.queryField.value as string).length;
       if (LENGTH === 0) {
        this.searchResults = [];
      }
      });
  }

  private getTopResults(): void {
    this.topExchanges = this.exchanges.filter(e => {
      return this.topExchangesList.indexOf(e.code) >= 0;
    }).sort((a, b) => {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
      });
    this.topExchanges.forEach(ex => {
      const INDEX = this.exchanges.indexOf(ex);
      this.exchanges.splice(INDEX, 1);
    });
  }

  public getSymbols(exchange: ExchangeModel): void {
    this.exchange = exchange;
    this.queryField.enable();
    this.pricesService.getSymbol(exchange)
      .subscribe((res: Array<SymbolModel>) => {
        this.symbols = res;
      }, err => {
        console.log(err);
      });
  }

  public getQuote(symbol: SymbolModel): void {
    this.quote = undefined;
    this.symbol = symbol;
    this.searchResults = [];
    this.queryField.setValue('');
    this.pricesService.getQuote(symbol)
      .subscribe((res: QuoteModel) => {
        this.quote = res;
      }, err => {
        console.log(err);
      });
  }

}
