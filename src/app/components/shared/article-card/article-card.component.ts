import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {

    @Input("article-data") articleDetail$: Observable<Article>;
  constructor() { }

  ngOnInit(): void {
  }

}
