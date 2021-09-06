import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-gifs-page',
  templateUrl: './gifs-page.component.html',
  styleUrls: ['./gifs-page.component.css']
})
export class GifsPageComponent implements OnInit, OnDestroy {

  currentPage: number = 1;
  showPagination: boolean = false;
  subscriber: Subscription;

  @HostListener('window:scroll') onWindowscroll() {
    if(window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      this.ChangePage(this.currentPage+1);
    }
  }
  
  constructor(private gifsService: GifsService) { }

  ngOnInit() {
    this.subscriber = this.gifsService.GetCurrentPage()
      .subscribe( page => {
        this.currentPage = page;
        this.showPagination = this.gifsService.results.length > 0 ? true : false; 
    }); 

    this.showPagination = this.gifsService.results.length > 0 ? true : false; 

    this.currentPage = (Number(localStorage.getItem('currentPage')) || 1);
  }

  ChangePage(page: number){
    this.gifsService.UpdateCurrentPage(page);
    this.gifsService.searchGifs(null, page);
  }

  ngOnDestroy(){
    this.subscriber.unsubscribe();
  }
}
