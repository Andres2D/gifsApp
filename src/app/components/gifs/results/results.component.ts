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
    console.log(this.gifsService.results);
    
    return this.gifsService.results;
  }

  OpenGif(url: string){
    window.open(url, '_blank');
  }

}
