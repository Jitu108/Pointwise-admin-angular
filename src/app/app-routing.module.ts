import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { TagFormComponent } from './components/tag-form/tag-form.component';
import { SourceListComponent } from './components/source-list/source-list.component';
import { SourceFormComponent } from './components/source-form/source-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryFormComponent } from './components/category-form/category-form.component';


const routes: Routes = [
  {
    path: 'articles',
    //loadChildren: './components/article-list/article-list.module#ArticleListModule'
    component: ArticleListComponent
  },
  {
    path: 'articles/detail',
    //loadChildren: './components/article-form/article-form.module#ArticleFormModule'
    component: ArticleFormComponent
  },
  {
    path: 'categories',
    component: CategoryListComponent
    //loadChildren: './components/category-list/category-list.module#CategoryListModule'
  },
  {
    path: 'categories/detail',
    //loadChildren: './components/category-form/category-form.module#CategoryFormModule'
    component: CategoryFormComponent
  },
  {
    path: 'sources',
    //loadChildren: './components/source-list/source-list.module#SourceListModule'
    component: SourceListComponent
  },
  {
    path: 'sources/detail',
    //loadChildren: './components/source-form/source-form.module#SourceFormModule'
    component: SourceFormComponent
  },
  {
    path: 'tags',
    //loadChildren: './components/tag-list/tag-list.module#TagListModule'
    component: TagListComponent
  },
  {
    path: 'tags/detail',
    //loadChildren: './components/tag-form/tag-form.module#TagFormModule'
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