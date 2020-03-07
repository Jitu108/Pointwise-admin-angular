import { MatComponentsModule } from './modules/mat-components.module';
import { PipeModule } from './pipes/pipe.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TopHeaderComponent } from './components/top-header/top-header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SynopsisComponent } from './components/shared/synopsis/synopsis.component';
import { DropDownListComponent } from './components/shared/drop-down-list/drop-down-list.component';
import { ChipsetComponent } from './components/shared/chipset/chipset.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryFormComponent } from './components/categories/category-form/category-form.component';
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { ArticleListComponent } from './components/articles/article-list/article-list.component';
import { ArticleFormComponent } from './components/articles/article-form/article-form.component';
import { SourceListComponent } from './components/sources/source-list/source-list.component';
import { SourceFormComponent } from './components/sources/source-form/source-form.component';
import { TagListComponent } from './components/tags/tag-list/tag-list.component';
import { TagFormComponent } from './components/tags/tag-form/tag-form.component';

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
    TagFormComponent,
    SynopsisComponent,
    DropDownListComponent,
    ChipsetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatComponentsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    PipeModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
