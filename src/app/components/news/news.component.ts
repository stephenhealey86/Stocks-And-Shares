import { Component, OnInit } from '@angular/core';
import { FinnhubNewsService } from 'src/app/services/finnhub-news.service';
import { HeadlineModel } from 'src/app/models/headline-model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news = [] as Array<HeadlineModel>;
  viewType = false;

  constructor(private newsService: FinnhubNewsService) { }

  ngOnInit() {
    this.newsService.getNews()
      .subscribe((res: Array<HeadlineModel>) => {
        this.news = res;
      }, err => {
        console.log(err);
      });
  }

}
