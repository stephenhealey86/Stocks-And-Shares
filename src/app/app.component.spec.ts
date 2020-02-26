import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NewsComponent } from './components/news/news.component';
import { HeadlineComponent } from './components/headline/headline.component';
import { TipsComponent } from './components/tips/tips.component';
import { PricesComponent } from './components/prices/prices.component';
import { FinnhubNewsService } from './services/finnhub-news.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        FinnhubNewsService
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        NewsComponent,
        PricesComponent,
        TipsComponent,
        HeadlineComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'StocksAndSharesSPA'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('StocksAndSharesSPA');
  });
});
