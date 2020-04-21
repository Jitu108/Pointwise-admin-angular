import { TagService } from 'src/app/services/tag.service';
import { SourceService } from 'src/app/services/source.service';

import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of, ReplaySubject } from 'rxjs';
import { Article } from 'src/app/models/article';
import { DropDownModel } from '../../shared/drop-down-list/drop-down-list.component';
import { Tag } from 'src/app/models/tag';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  public articleId: number;
  public articleDetail$: Observable<Article>;
  public objArticleDetail: Article;
  public mode: string;
  public localSynopsis: string[];

  public sources$: Observable<DropDownModel[]>;
  public selectedSource$: Observable<string>;
  public selectSourceCaption = "Select Source";

  public categories$: Observable<DropDownModel[]>;
  public selectedCategory$: Observable<string>;
  public selectCategoryCaption = "Select Category";

  public tagList$: Observable<Tag[]>;
  public tags$: Observable<string[]>;
  public selectedTags$: Observable<string[]>;
  base64Image;
    
  public Resources = {
    Header: "Article",
    ImageCaption: "Select Image",
    AuthorCaption: "Author",
    AuthorPlaceholder: "Author",
    TitleCaption: "Title",
    TitlePlaceholder: "Title",
    SummaryCaption: "Summary",
    SummaryPlaceholder: "Summary",
    UrlCaption: "Url",
    UrlPlaceholder: "Url",
    PublicationDateCaption: "Publication Date",
    ContentCaption: "Content",
    ContentPlaceholder: "Content",
    SynopsisCaption: "Synopsis",
    SynopsisPlaceholder: "Synopsis",
    SourceCaption: "Source",
    CategoryCaption: "Category",
    TagCaption: "Tag",
    SaveCaption: "Save",
    CancelCaption: "Cancel",
    Validation: {
      AuthorRequiredMessage: "Author is required.",
      TitleRequiredMessage: "Title is required.",
      SummaryRequiredMessage: "Summary is required.",
      UrlRequiredMessage: "Url is required.",
      ContentRequiredMessage: "Content is required.",
      SynopsisRequiredMessage: "Synopsis is required."
    },

    PanelHeader: {
      MetadataCaption: "Metadata",
      ImageCaption: "Image",
      ArticleCaption: "Article"
    }
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private sourceService: SourceService,
    private categoryService: CategoryService,
    private tagService: TagService
  ) {  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
      this.loadSources();
      this.loadCategories();
      this.loadTags();

       this.activatedRoute.queryParams.subscribe((params: Params) => {
         this.articleId = parseInt(params['id']);

         //Edit
        if(!isNaN(this.articleId)){
            this.mode = "Edit";
          } else { // Add
            this.articleId = 0;
            this.mode = "Add";
          }

          this.getArticleDetailById(this.articleId);
       });
  }

  loadSources() {
    // Get all Sources
    this.sources$ = 
    this.sourceService.getSources()
    .pipe(
        map(items =>
            items.map(item => {
            return {id: item.id.toString(), name: item.name}
            })
        )
    );
  }

  loadCategories() {
      // Get all Categories
      this.categories$ = 
      this.categoryService.getCategories()
      .pipe(
        map(items => 
          items.map(item => {
            return {id:item.id.toString(),  name:item.name}
          })
        )
      );
  }

  loadTags() {
    // Get all Tags
    this.tagList$ = this.tagService.getTags();

    this.tags$ = this.tagList$
    .pipe(
        map(items => 
            {
                return items.map(
                    item => {
                        return item.name;
                    }
                )
            }
        )
    );
  }

  getArticleDetailById(id?: number) {
    this.articleService.getById(id)
    .subscribe(x => {
        this.articleDetail$ = this.articleService.article$;
        this.objArticleDetail = this.articleService.selectedArticle;

        this.selectedCategory$ = this.articleDetail$.pipe(
            map(x => x.articleCategoryId.toString())
        );
        
        this.selectedSource$ = this.articleDetail$.pipe(
            map(x => {
                return x.articleSourceId.toString();
            })
        );

        this.selectedTags$ = this.articleDetail$.pipe(
            map(x => {
                if(x.articleTags !== undefined) {
                    return x.articleTags;
                }
                else {
                    return [];
                }
            })
        );

    });
  }

  onArticleSubmit(form) {
    if(form.valid) {
        this.articleId = this.articleId === undefined? 0: this.articleId;
        this.articleService.save(this.articleId, this.objArticleDetail);
        this.router.navigate(['/articles']);
      }
  }

  onCancelClick() {
    this.router.navigate(['/articles']);
  }

  onAuthorChange(event) {
      this.objArticleDetail.articleAuthor = event.target.value;
      this.articleService.refreshSelectedArticle(this.objArticleDetail);
  }

  onUrlChange(event) {
    this.objArticleDetail.articleUrl = event.target.value;
      this.articleService.refreshSelectedArticle(this.objArticleDetail);
  }

  onPublicationDateChange(event) {
    this.objArticleDetail.articlePublicationDate = event.target.value;
    console.log(event.target.value);
    this.articleService.refreshSelectedArticle(this.objArticleDetail);
  }

  onTitleChange(event) {
    this.objArticleDetail.articleTitle = event.target.value;
      this.articleService.refreshSelectedArticle(this.objArticleDetail);
  }

  onSummaryChange(event) {
    this.objArticleDetail.articleSummary = event.target.value;
      this.articleService.refreshSelectedArticle(this.objArticleDetail);
  }

  onContentChange(event) {
    this.objArticleDetail.articleContent = event.target.value;
      this.articleService.refreshSelectedArticle(this.objArticleDetail);
  }

  onSynopsisChange(event) {
    this.objArticleDetail.articleSynopsis = event.target.value;
      this.articleService.refreshSelectedArticle(this.objArticleDetail);
  }

  onSourceSelectionChange(selectedSource: DropDownModel) {
      this.objArticleDetail.articleSourceId = selectedSource === null ? 0 : parseInt(selectedSource.id);
      this.objArticleDetail.articleSource = selectedSource === null ? "" : selectedSource.name;
      this.articleService.refreshSelectedArticle(this.objArticleDetail);

  }

  onCategorySelectionChange(selectedCategory: DropDownModel) { 
      this.objArticleDetail.articleCategoryId = selectedCategory === null ? 0 : parseInt(selectedCategory.id);
      this.objArticleDetail.articleCategory = selectedCategory === null ? "" : selectedCategory.name;
      this.articleService.refreshSelectedArticle(this.objArticleDetail);

  }

  onTagSelectionChange(selectedTags: string[]) {
    if(this.objArticleDetail.articleTags != selectedTags) {
      this.objArticleDetail.articleTags = selectedTags === null? selectedTags = [] : selectedTags;
        this.articleService.refreshSelectedArticle(this.objArticleDetail);
    }

  }

  onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (evnt) => { // called once readAsDataURL is completed
        this.objArticleDetail.imageData = evnt.target.result;
        console.log(evnt.target.result);
        this.objArticleDetail.imageName = event.target.files[0].name;
        this.articleService.refreshSelectedArticle(this.objArticleDetail);

      }
    }
  }
}