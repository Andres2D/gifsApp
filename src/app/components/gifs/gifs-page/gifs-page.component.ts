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
  loaderSubscription: Subscription;
  showLoading: boolean = false;

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
    });

    this.loaderSubscription = this.gifsService.getLoader()
      .subscribe( loader => {
        //this.showLoading = loader;
        this.showLoading = true;
      });
  }

  ChangePage(page: number){
    if(!this.showLoading) {
      this.gifsService.setLoader(true);
      this.gifsService.UpdateCurrentPage(page);
      this.gifsService.searchGifs(null, page);
    }
  }

  ngOnDestroy(){
    this.subscriber.unsubscribe();
    this.loaderSubscription.unsubscribe();
  }
}
