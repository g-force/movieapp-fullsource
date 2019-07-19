import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/Movie';
import { MovieService } from '../../services/movie.service';
import { switchMap } from 'rxjs/operators';
import { Search } from '../../models/Search';
import { MovieDetail } from 'src/app/models/MovieDetail';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[];
  currentFilterYear = 2000;
  filterMovieYears: any[] = [{ class: 'active', year: 2000 }, { class: '', year: 1990 }];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.fetchAndFilterByYear(this.currentFilterYear);
  }

  // Make API request to get movies for the selected year
  fetchAndFilterByYear(year: number) {
    this.movies = [];
    this.currentFilterYear = year;
    this.movieService.getMovie().subscribe(movie => {
      return (this.addMovieDetails(movie.Search, year));
    });
  }

  // Make API to get movie details
  addMovieDetails(movies: Movie[], year: number) {
    movies.forEach((movie) => {
      this.movieService.getMovieDetail(movie.imdbID).subscribe(movieDetail => {
        const _movie: Movie = movie; _movie.Detail = movieDetail;
        _movie.Detail.PosterLocalFilePath = './assets/' + this.getFileNameFromUrl(movieDetail.Poster);
        if (this.isYearFiltered(movieDetail.Year, year)) {
          this.movies.push(_movie);
        }
      });
    });
  }

  // Check for year filtering
  isYearFiltered(movieYear: string, year: number) {
    const decade: number = (year === 1990) ? 2000 : 2020;
    const _movieYear: number = parseInt(movieYear.split('–').shift());
    if (_movieYear >= year && _movieYear < decade) {
      return true;
    } else {
      return false;
    }
  }

  // Get image file name
  getFileNameFromUrl(url: string) {
    return url.split('/').pop().split('#')[0].split('?')[0];
  }

}
