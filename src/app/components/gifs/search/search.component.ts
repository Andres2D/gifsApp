import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(private gifsService: GifsService) { }

  @ViewChild('txtSearch', null) txtSearch: ElementRef<HTMLInputElement>;

  search(){
    const value = this.txtSearch.nativeElement.value;
    if(value.trim().length === 0 )
    {
      return;
    }

    this.gifsService.setLoader(true);
    this.gifsService.UpdateCurrentPage(1);
    this.gifsService.searchGifs(value, 1);
    
    this.txtSearch.nativeElement.value = '';
  }
}
