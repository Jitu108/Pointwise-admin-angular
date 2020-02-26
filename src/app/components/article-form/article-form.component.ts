import { Tag } from './../../models/tag';
import { TagService } from './../../services/tag.service';
import { CategoryService } from 'src/app/services/category.service';
import { SourceService } from './../../services/source.service';
import { DropDownModel } from './../shared/drop-down-list/drop-down-list.component';

import { ArticleService } from './../../services/article.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Article } from './../../models/article';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

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

  public sources$: Observable<DropDownModel[]>;
  public selectedSource: Observable<string>;
  public selectSourceCaption = "Select Source";

  public categories$: Observable<DropDownModel[]>;
  public selectedCategory: Observable<string>;
  public selectCategoryCaption = "Select Category";

  public tagList: Tag[];
  public tags: string[];
  public selectedTags: string[];
    
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
    private tagServcie: TagService
  ) {  }

  base64Image;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
       // Get all Sources
       const sources = this.sourceService.getSources()
       .map(x => {
         return { id: x.id.toString(), name: x.name };
       });
       this.sources$ = of(sources);
      
       // Get all Categories
      this.categories$ = this.categoryService.getAll().pipe(
        map(items => 
          items.map(item => {
            return {id:item.Id.toString(),  name:item.Name}
          })
        )
      );

       // Get all Tags
       this.tagList = this.tagServcie.getTags();

       this.tags = this.tagList.map(x => x.name );
   
   
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

    const selectedCategoryValue = this.articleDetail.categoryId !== undefined? this.articleDetail.categoryId.toString() : "";
    this.selectedCategory = of(selectedCategoryValue);

    const selectedSourceValue = this.articleDetail.sourceId !== undefined? this.articleDetail.sourceId.toString() : "";
    this.selectedSource = of(selectedSourceValue);

  }

  onArticleSubmit(form) {
    if(form.valid) {
      this.articleService.updateArticle(this.articleDetail);
      this.router.navigate(['/articles']);
    }
  }

  onCancelClick() {
    this.router.navigate(['/articles']);
  }

  onSourceSelectionChange(selectedSource: DropDownModel) {
    this.articleDetail.sourceId = selectedSource === null ? 0 : parseInt(selectedSource.id);
    this.articleDetail.source = selectedSource === null ? "" : selectedSource.name;
  }

  onCategorySelectionChange(selectedCategory: DropDownModel) { 
    this.articleDetail.categoryId = selectedCategory === null ? 0 : parseInt(selectedCategory.id);
    this.articleDetail.category = selectedCategory === null ? "" : selectedCategory.name;
  }
  onTagSelectionChange(selectedTags: string[]){
    console.log("Tag Selection Change : ");
    console.log(selectedTags);
    this.articleDetail.tags = selectedTags === null? selectedTags = [] : selectedTags;
  }

  onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (evnt) => { // called once readAsDataURL is completed
        this.articleDetail.image = evnt.target.result;
        this.articleDetail.imageName = event.target.files[0].name;
      }
    }
  }
}
