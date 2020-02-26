import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HeadlineModel } from '../models/headline-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinnhubNewsService {

  private baseUrl = environment.url;
  private newsUrl = 'news?category=general&token=';
  private token = environment.token;

constructor(private http: HttpClient) { }

public getNews(): Observable<Array<HeadlineModel>> {
  return this.http.get<Array<HeadlineModel>>(this.baseUrl + this.newsUrl + this.token);
}

}
