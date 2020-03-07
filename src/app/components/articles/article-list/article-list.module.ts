import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleListRoutingModule } from './article-list-routing.module';
import { ArticleListComponent } from './article-list.component';
import { PipeModule } from 'src/app/pipes/pipe.module';


@NgModule({
  declarations: [ArticleListComponent],
  imports: [
    CommonModule,
    ArticleListRoutingModule,
    PipeModule.forRoot()
  ]
})
export class ArticleListModule { }
