import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsPageComponent } from './gifs-page/gifs-page.component';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    GifsPageComponent,
    SearchComponent,
    ResultsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    GifsPageComponent
  ]
})
export class GifsModule { }
