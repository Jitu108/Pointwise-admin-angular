import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleFormRoutingModule } from './article-form-routing.module';
import { ArticleFormComponent } from './article-form.component';


@NgModule({
  declarations: [ArticleFormComponent],
  imports: [
    CommonModule,
    ArticleFormRoutingModule
  ]
})
export class ArticleFormModule { }
