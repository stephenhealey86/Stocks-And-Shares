import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NewsComponent } from './components/news/news.component';
import { PricesComponent } from './components/prices/prices.component';
import { TipsComponent } from './components/tips/tips.component';
import { HeadlineComponent } from './components/headline/headline.component';
import { FinnhubNewsService } from './services/finnhub-news.service';
import { ReactiveFormsModule } from '@angular/forms';
import { QuoteComponent } from './components/quote/quote.component';
import { FinnhubPricesService } from './services/finnhub-prices.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FinnhubQuoteService } from './services/finnhub-quote.service';
import { D3LineChartComponent } from './components/d3-line-chart/d3-line-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NewsComponent,
    PricesComponent,
    TipsComponent,
    HeadlineComponent,
    D3LineChartComponent,
    QuoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    TabsModule.forRoot()
  ],
  providers: [
    FinnhubNewsService,
    FinnhubPricesService,
    FinnhubQuoteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
