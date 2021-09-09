import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent,
    FooterComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
