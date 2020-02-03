import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  {
    path: 'articles',
    loadChildren: './components/article-list/article-list.module#ArticleListModule'
  },
  {
    path: 'article-detail',
    loadChildren: './components/article-form/article-form.module#ArticleFormModule'
  },
  {
    path: 'categories',
    loadChildren: './components/category-list/category-list.module#CategoryListModule'
  },
  {
    path: 'category-detail',
    loadChildren: './components/category-form/category-form.module#CategoryFormModule'
  },
  {
    path: 'sources',
    loadChildren: './components/source-list/source-list.module#SourceListModule'
  },
  {
    path: 'source-detail',
    loadChildren: './components/source-form/source-form.module#SourceFormModule'
  },
  {
    path: 'tags',
    loadChildren: './components/tag-list/tag-list.module#TagListModule'
  },
  {
    path: 'tag-detail',
    loadChildren: './components/tag-form/tag-form.module#TagFormModule'
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
