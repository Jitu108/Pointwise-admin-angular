import { PipeModule } from './pipes/pipe.module';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { TagFormComponent } from './components/tag-form/tag-form.component';
import { SourceListComponent } from './components/source-list/source-list.component';
import { SourceFormComponent } from './components/source-form/source-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TopHeaderComponent } from './components/top-header/top-header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TopHeaderComponent,
    PageNotFoundComponent,
    ArticleListComponent,
    ArticleFormComponent,
    CategoryListComponent,
    CategoryFormComponent,
    SourceListComponent,
    SourceFormComponent,
    TagListComponent,
    TagFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    PipeModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
