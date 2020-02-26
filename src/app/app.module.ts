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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NewsComponent,
    PricesComponent,
    TipsComponent,
    HeadlineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    FinnhubNewsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
