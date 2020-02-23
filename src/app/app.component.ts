import { Component, OnInit } from '@angular/core';
import { CategoryRepository } from './repository/category-repository.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements  OnInit{
  title = 'pointwise-admin';

  constructor(private categoryRepo:CategoryRepository) {

  }
  ngOnInit() {
    this.categoryRepo.init();
}
}
