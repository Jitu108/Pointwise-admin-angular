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
    DeleteCaption: "Delete",
    TableHeaders: {
      SlColumn: "#",
      AuthorColumn: "Author",
      TitleColumn: "Title",
      SummaryColumn: "Summary",
      UrlColumn: "Url",
      PublicationDateColumn: "Publication Date",
      ContentColumn: "Content",
      SourceColumn: "Source",
      CategoryColumn: "Category",
      ActionColumn: "Action"
    }
  }
  public articles: Article[] = [];
  search: string;
  constructor(private router: Router, private articleService: ArticleService) { }

  ngOnInit() {
    this.getArticles();
  }

// Load all Articles
getArticles() {
  debugger;
  console.log("getArticles Called - Component");
  this.articles = this.articleService.getArticles();
  console.log(this.articles);
  return this.articles;
}

// Add Article
addArticle() {
  this.router.navigate(['/articles/detail']);
  console.log("Add Article");
}

// Edit Article
editArticle(id: number) {
  console.log("Edit Article : " + id);
  this.router.navigate(['/articles/detail'], {queryParams: {id: id}});
}

// Delete Article
deleteArticle(id: number) {
  this.articleService.deleteArticle(id);
  this.getArticles();
}

searchArticle(searchString: string) {
  this.articles = this.articleService.getArticlesBySearchString(searchString);
  console.log(searchString);
}

}
