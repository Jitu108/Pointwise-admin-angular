import { CategoryService } from 'src/app/services/category.service';
import { SourceService } from './../../services/source.service';
import { DropDownModel } from './../shared/drop-down-list/drop-down-list.component';

import { ArticleService } from './../../services/article.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Article } from './../../models/article';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  public articleId: string;
  public articleDetail = <Article>{}
  public mode: string;
  public localSynopsis: string[];

  public sources: DropDownModel[];

  public selectedSource: string;
  public selectSourceCaption = "Select Source";

  public categories: DropDownModel[];

  public selectedCategory: string;
  public selectCategoryCaption = "Select Category";
    
  public Resources = {
    Header: "Article",
    AuthorCaption: "Author",
    AuthorPlaceholder: "Author",
    TitleCaption: "Title",
    TitlePlaceholder: "Title",
    SummaryCaption: "Summary",
    SummaryPlaceholder: "Summary",
    UrlCaption: "Url",
    UrlPlaceholder: "Url",
    PublicationDateCaption: "Pub. Date",
    ContentCaption: "Content",
    ContentPlaceholder: "Content",
    SynopsisCaption: "Synopsis",
    SynopsisPlaceholder: "Synopsis",
    SourceCaption: "Source",
    CategoryCaption: "Category",
    SaveCaption: "Save",
    CancelCaption: "Cancel",
    Validation: {
      AuthorRequiredMessage: "Author is required.",
      TitleRequiredMessage: "Title is required.",
      SummaryRequiredMessage: "Summary is required.",
      UrlRequiredMessage: "Url is required.",
      ContentRequiredMessage: "Content is required.",
      SynopsisRequiredMessage: "Synopsis is required."
    }
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private sourceService: SourceService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    // Get all Sources
    this.sources = this.sourceService.getSources()
    .map(x => {
      return { id: x.id.toString(), name: x.name };
    });

    // Get all Categories
    this.categories = this.categoryService.getCategories()
    .map(x => {
      return { id: x.id.toString(), name: x.name };
    });


    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.articleId = params['id'];

      //Edit
      if(this.articleId !== undefined) {
        this.getArticleDetailById(this.articleId);

        this.mode = "Edit";
      } else { // Add
        this.articleDetail['id'] = 0;
        this.mode = "Add";
      }
    });
  }

  getArticleDetailById(id: string) {
    this.articleDetail = this.articleService.getArticleById(parseInt(id));

    this.selectedCategory = this.articleDetail.categoryId.toString();
    this.selectedSource = this.articleDetail.sourceId.toString();

  }
  onArticleSubmit(form) {
    debugger;
    if(form.valid) {
      //this.articleDetail.publicationDate = new Date(this.articleDetail.publicationDate.year, this.articleDetail.publicationDate.month -1, this.articleDetail.publicationDate.day);
      this.articleService.updateArticle(this.articleDetail);
      this.router.navigate(['/articles']);
    }
  }

  onCancelClick() {
    this.router.navigate(['/articles']);
  }

  onSourceSelectionChange(selectedSource: DropDownModel) {
    this.articleDetail.sourceId = selectedSource === null ? 0 : parseInt(selectedSource.id);
  }

  onCategorySelectionChange(selectedCategory: DropDownModel) { 
    this.articleDetail.categoryId = selectedCategory === null ? 0 : parseInt(selectedCategory.id);
  }
}
