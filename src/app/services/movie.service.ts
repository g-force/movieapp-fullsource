import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Search } from '../models/Search';
import { Observable } from 'rxjs';
import { MovieDetail } from '../models/MovieDetail';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  fetchUrl:string = 'http://www.omdbapi.com/?apikey=2c9206a6&';
  constructor(private http:HttpClient) { }

  getMovie():Observable<Search>{
    const urlWithParameters = `${this.fetchUrl}&s=Batman`;
    return this.http.get<Search>(urlWithParameters);
   }

   getMovieDetail(imdbId:string):Observable<MovieDetail>{
    const urlWithParameters = `${this.fetchUrl}&i=${imdbId}`;
    return this.http.get<MovieDetail>(urlWithParameters);
   }
}
