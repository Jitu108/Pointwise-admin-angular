import { MatComponentsModule } from './modules/mat-components.module';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TopHeaderComponent } from './components/top-header/top-header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { SynopsisComponent } from './components/shared/synopsis/synopsis.component';
import { DropDownListComponent } from './components/shared/drop-down-list/drop-down-list.component';
import { ChipsetComponent } from './components/shared/chipset/chipset.component';

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

    NgbModule,
    PipeModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
