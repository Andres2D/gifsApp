import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = 'xTXOhxvMq9ym70HHltWoaPRu4ies4qUe';
  private _serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private _history: string[] = [];
  public results: Gif[] = [];
  private subject = new Subject<number>();
  private _limit: number = 12;

  get history(){
    return [...this._history];
  }

  constructor(private http: HttpClient) { 
    this._history = JSON.parse(localStorage.getItem('history')) || [];
    this.results = JSON.parse(localStorage.getItem('lastSearch')) || [];
  }

  UpdateCurrentPage(page: number){
    this.subject.next(page);
  }

  GetCurrentPage(){
    return this.subject.asObservable();
  }

  searchGifs(query: string = '', page: number){
    let offset = 1;
    
    if(query === null){
      query = this._history[0];
    }else{

      if(this._history.includes(query)){
        this._history.splice(this._history.indexOf(query) ,1);
        this._history.unshift(query);
      }
    }

    query = query.trim().toLowerCase();
    
    if(!this._history.includes(query)){
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);
      
      localStorage.setItem('history', JSON.stringify(this._history));
    }

    localStorage.setItem('currentPage', page.toString());

    if(page === 1){
      offset = 1;
      this.results = [];
    }else{
      offset = ((page - 1) * this._limit) + 1;
    }
      
    const params = new HttpParams()
    .set('api_key', this._apiKey)
    .set('q', query)
    .set('offset', offset.toString())
    .set('limit', this._limit.toString())
    
    this.http.get<SearchGifsResponse>(`${this._serviceUrl}/search`, {params})
      .subscribe((response) => {
        response.data.forEach((gif) => {
          this.results.push(gif);
        });
        localStorage.setItem('lastSearch', JSON.stringify(this.results));
        this.UpdateCurrentPage(page);
      }, error => {
      });
  }
}
