import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  public Resources = {
    Header: "Articles",
    SearchPlaceholder:"Search",
    AddToolTip: "Add Article",
    AddCaption: "Article",
    EditCaption: "Edit",
    SoftDeleteCaption: "Soft Delete",
    SoftDeleteMessage: "Article deleted successfully.",
    UndoSoftDeleteCaption: "Undo Soft Delete",
    UndoSoftDeleteMessage: "Article deletion undone.",
    DeleteCaption: "Delete",
    DeleteMessage: "Article deleted permanently.",
    TableHeaders: {
      SlColumn: "#",
      AuthorColumn: "Author",
      TitleColumn: "Title",
      SummaryColumn: "Summary",
      UrlColumn: "Url",
      PublicationDateColumn: "Publication Date",
      ContentColumn: "Content",
      SynopsisColumn: "Synopsis",
      SourceColumn: "Source",
      CategoryColumn: "Category",
      DeletedColumn: "IsDeleted?",
      ActionColumn: "Action"
    }
  }
  public articles$: Observable<Article[]>;
  public articleDetail$: Observable<Article>;
  public loadedArticleId: number;
  search: string;
  constructor(
      private router: Router, 
      private articleService: ArticleService,
      private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getArticles();
  }

  // Load all Articles
  getArticles() {

    this.articles$ = this.articleService.getAllArticles();
    return this.articles$;
  }

  loadArticle(id: number) {
      console.log(id);
      this.loadedArticleId = id;
      this.articleService.getById(id)
    .subscribe(x => {
        this.articleDetail$ = this.articleService.article$;

        this.articleDetail$.subscribe(x => console.log(x));
    });
  }

  // Add Article
  addArticle() {
    this.router.navigate(['/articles/detail']);
  }

  // Edit Article
  editArticle(id: number) {
    this.router.navigate(['/articles/detail'], {queryParams: {id: id}});
  }

  // Soft Delete Article
  softDeleteArticle(id: number) {
    this.articleService.softDelete(id)
    .subscribe(x => {
        this.loadArticle(this.loadedArticleId);
        this.openSnackBar(this.Resources.SoftDeleteMessage);
    });
  }

  // Undo Soft Delete Article
  undoSoftDeleteArticle(id: number) {
    this.articleService.undoSoftDelete(id)
    .subscribe(x => {
        this.loadArticle(this.loadedArticleId);
        this.openSnackBar(this.Resources.UndoSoftDeleteMessage);
    });
  }

  // Delete Article
  deleteArticle(id: number) {
    this.articleService.delete(id).subscribe(x => {
        this.loadArticle(this.loadedArticleId);
        this.openSnackBar(this.Resources.DeleteMessage);
    });
  }

  searchArticle(searchString: string) {
    this.articles$ = this.articleService.getAllBySearchString(searchString);
  }

  openSnackBar(message: string) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'right';
    config.duration = 10000;
    this._snackBar.open(message, 'close', config);
  }
}
