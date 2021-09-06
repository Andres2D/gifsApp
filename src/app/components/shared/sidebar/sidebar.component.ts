import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {

  constructor(private gifsService: GifsService) { }

  get history(){
    return this.gifsService.history;
  }

  Search(search: string){
    this.gifsService.UpdateCurrentPage(1);
    this.gifsService.searchGifs(search, 1);
  }
}
