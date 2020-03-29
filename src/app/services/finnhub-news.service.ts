import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { HeadlineModel } from '../models/headline-model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FinnhubNewsService {

  private baseUrl = environment.url;
  private newsUrl = 'news?category=general&token=';
  private token = environment.token;

constructor(private http: HttpClient) { }

public getNews(): Observable<Array<HeadlineModel>> {
  return this.http.get<Array<HeadlineModel>>(this.baseUrl + this.newsUrl + this.token)
    .pipe(
      catchError(this.handleError)
    );
}

private handleError(err: any): Observable<never> {
  console.log(err);
  return EMPTY;
}

}
