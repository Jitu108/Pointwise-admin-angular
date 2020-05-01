import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRegistrationComponent } from './components/users/user-registration/user-registration.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { CategoryFormComponent } from './components/categories/category-form/category-form.component';
import { ArticleListComponent } from './components/articles/article-list/article-list.component';
import { ArticleFormComponent } from './components/articles/article-form/article-form.component';
import { SourceListComponent } from './components/sources/source-list/source-list.component';
import { SourceFormComponent } from './components/sources/source-form/source-form.component';
import { TagListComponent } from './components/tags/tag-list/tag-list.component';
import { TagFormComponent } from './components/tags/tag-form/tag-form.component';
import { UserLoginComponent } from './components/users/user-login/user-login.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
//   {
//     path: 'articles',
//     //loadChildren: './components/article-list/article-list.module#ArticleListModule'
//     component: ArticleListComponent
//   },
  { path: 'articles', component: ArticleListComponent, canActivate:[AuthGuard] },
  {  path: 'articles/detail', component: ArticleFormComponent, canActivate:[AuthGuard] },
  { path: 'categories', component: CategoryListComponent, canActivate:[AuthGuard] },
  { path: 'categories/detail', component: CategoryFormComponent , canActivate:[AuthGuard]},
  { path: 'sources', component: SourceListComponent, canActivate:[AuthGuard] },
  { path: 'sources/detail', component: SourceFormComponent, canActivate:[AuthGuard] },
  { path: 'tags', component: TagListComponent, canActivate:[AuthGuard] },
  { path: 'tags/detail', component: TagFormComponent, canActivate:[AuthGuard] },
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }