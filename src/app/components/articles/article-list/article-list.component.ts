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
    UndoSoftDeleteCaption: "Undo Soft Delete",
    DeleteCaption: "Delete",
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
  search: string;
  constructor(private router: Router, private articleService: ArticleService) { }

  ngOnInit() {
      //debugger;
    this.getArticles();
  }

  // Load all Articles
  getArticles() {

    this.articles$ = this.articleService.getAllArticles();
    return this.articles$;
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
    this.articleService.softDelete(id);
  }

  // Undo Soft Delete Article
  undoSoftDeleteArticle(id: number) {
    this.articleService.undoSoftDelete(id);
  }

  // Delete Article
  deleteArticle(id: number) {
    this.articleService.delete(id);
  }

  searchArticle(searchString: string) {
    this.articles$ = this.articleService.getAllBySearchString(searchString);
  }
}
