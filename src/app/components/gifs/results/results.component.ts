import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {

  constructor(private gifsService: GifsService) { }

  get results(){
    return this.gifsService.results;
  }

  OpenGif(url: string){
    window.open(url, '_blank');
  }

  scrollToTop() {
    window.scrollTo(0,0);
  }
}
