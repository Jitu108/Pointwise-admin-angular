import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OpenMatSnackBar } from 'src/app/common/mat-items';
import { EntityType, AccessType } from 'src/app/common/enum';
import { MatTableDataSource } from '@angular/material/table';

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
      IdColumn: "Id",
      AuthorColumn: "Author",
      TitleColumn: "Title",
      SummaryColumn: "Summary",
      UrlColumn: "Url",
      PublicationDateColumn: "Publication Date",
      ContentColumn: "Content",
      SynopsisColumn: "Synopsis",
      SourceColumn: "Source",
      CategoryColumn: "Category",
      TagColumn: "Tags",
      DeletedColumn: "IsDeleted?",
      ActionColumn: "Action"
    }
  }

  public articles$: Observable<Article[]>;
  public articleDetail$: Observable<Article>;
  public loadedArticleId: number;

  public isCreatable: boolean = false;
  public isEditable: boolean = false;
  public isSoftDeletable: boolean = false;
  public isUndoSoftDeletable: boolean = false;
  public isDeletable: boolean = false;


    displayedColumns: string[] = ['articleId', 'articleTitle', 'articlePublicationDate', 'articleSource', 'articleCategory', 'articleTags', 'action'];
    dataSource = new MatTableDataSource<Article>();
    selection = new SelectionModel<Article>(false);

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
      private router: Router, 
      private articleService: ArticleService,
      private snackBar: MatSnackBar,
      public authService: AuthService) { }

  ngOnInit() {
      this.isCreatable = this.authService.hasRight(EntityType.Article, AccessType.Add);
      this.isEditable = this.authService.hasRight(EntityType.Article, AccessType.Update);
      this.isSoftDeletable = this.authService.hasRight(EntityType.Article, AccessType.SoftDelete);
      this.isUndoSoftDeletable = this.authService.hasRight(EntityType.Article, AccessType.UndoSoftDelete);
      this.isDeletable = this.authService.hasRight(EntityType.Article, AccessType.Delete);
      this.getArticles();
  }

  // Load all Articles
  getArticles() {
    this.articles$ = this.articleService.getArticles();
    this.articles$.subscribe(x => {
        this.dataSource.data = x;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    })
  }

  loadArticle(id: number) {
      this.loadedArticleId = id;
      this.articleService.getById(id)
    .subscribe(x => {
        this.articleDetail$ = this.articleService.article$;
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
        this.getArticles();
        OpenMatSnackBar(this.snackBar, this.Resources.SoftDeleteMessage);
    });
  }

  // Undo Soft Delete Article
  undoSoftDeleteArticle(id: number) {
    this.articleService.undoSoftDelete(id)
    .subscribe(x => {
        this.getArticles();
        this.loadArticle(this.loadedArticleId);
        OpenMatSnackBar(this.snackBar, this.Resources.UndoSoftDeleteMessage);
    });
  }

  // Delete Article
  deleteArticle(id: number) {
    this.articleService.delete(id).subscribe(x => {
        this.getArticles();
        this.loadArticle(this.loadedArticleId);
        OpenMatSnackBar(this.snackBar, this.Resources.DeleteMessage);
    });
  }

  searchArticle(searchString: string) {
    this.articles$ = this.articleService.getAllBySearchString(searchString);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
