import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { CategoryFormComponent } from './components/categories/category-form/category-form.component';
import { ArticleListComponent } from './components/articles/article-list/article-list.component';
import { ArticleFormComponent } from './components/articles/article-form/article-form.component';
import { SourceListComponent } from './components/sources/source-list/source-list.component';
import { SourceFormComponent } from './components/sources/source-form/source-form.component';
import { TagListComponent } from './components/tags/tag-list/tag-list.component';
import { TagFormComponent } from './components/tags/tag-form/tag-form.component';


const routes: Routes = [
  {
    path: 'articles',
    //loadChildren: './components/article-list/article-list.module#ArticleListModule'
    component: ArticleListComponent
  },
  { 
    path: 'articles/detail',
    component: ArticleFormComponent
  },
  {
    path: 'categories',
    component: CategoryListComponent
  },
  {
    path: 'categories/detail',
    component: CategoryFormComponent
  },
  {
    path: 'sources',
    component: SourceListComponent
  },
  {
    path: 'sources/detail',
    component: SourceFormComponent
  },
  {
    path: 'tags',
    component: TagListComponent
  },
  {
    path: 'tags/detail',
    component: TagFormComponent
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }