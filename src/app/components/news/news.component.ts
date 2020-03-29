import { Component, OnInit } from '@angular/core';
import { FinnhubNewsService } from 'src/app/services/finnhub-news.service';
import { combineLatest, BehaviorSubject, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  viewType = true;
  hideBtn = false;

  private orderBySubject = new BehaviorSubject<string>('asce');
  private orderByAction$ = this.orderBySubject.asObservable();

  news$ = combineLatest([
    this.newsService.getNews(),
    this.orderByAction$
  ]).pipe
  (
    map(([headlines, order]) => {
      if (order === 'desc') {
        headlines = headlines.sort((a, b) => {
          return new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
      });
      } else if (order === 'asce') {
        headlines = headlines.sort((a, b) => {
          return new Date(a.datetime).getTime() - new Date(b.datetime).getTime();
      });
      }
      return headlines;
    }),
    catchError(err => {
      console.log(err);
      return EMPTY;
    })
  );

  constructor(private newsService: FinnhubNewsService) { }

  ngOnInit() {
    window.addEventListener('resize', () => {
      this.detectScreenSize();
    });

    this.detectScreenSize();
  }

  detectScreenSize() {
    this.hideBtn = false;
    if (window.innerWidth < 550) {
      this.viewType = true;
      this.hideBtn = true;
    }
  }

  orderByEvent(val: string): void {
    this.orderBySubject.next(val);
  }

}
