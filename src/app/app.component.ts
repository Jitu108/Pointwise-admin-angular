import { UserService } from 'src/app/services/user.service';
import { TagRepository } from './repositories/tag-repository.service';
import { SourceRepository } from './repositories/source-repository.service';
import { Component, OnInit } from '@angular/core';
import { CategoryRepository } from './repositories/category-repository.service';
import { ArticleRepository } from './repositories/article-repository.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements  OnInit{
  title = 'pointwise-admin';

  constructor(
    private categoryRepo:CategoryRepository, 
    private sourceRepo: SourceRepository,
    private tagRepo: TagRepository,
    private articleRepo: ArticleRepository) {

  }
  ngOnInit() {
    this.categoryRepo.init();
    this.sourceRepo.init();
    this.tagRepo.init();
    this.articleRepo.init();
  }
}
