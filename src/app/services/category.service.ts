import { Category } from 'src/app/models/category';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LocalStorageTable } from '../enums/local-storage-table.enum';
import { CategoryRepository } from '../repository/category-repository.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public categories: Category[] = [];
  
  constructor(private repository: CategoryRepository) { }


  // Save Category
  save(id: number, category: Category) {
    return this.repository.save(id, category);
  }

  // Delete Category
  delete(id: number) {
    return this.repository.delete(id);
  }

  // Get Category By Id
  getById(id: number) : Observable<Category> {
    return this.repository.getById(id);
  }

  // Get all Categories
  getAll() : Observable<Category[]> {
    var test = this.repository.getAll();
    return test;
  }

  // Search Categories
  getBySearchString(searchString: string){
    // if(searchString === "") {
    //   return this.getCategories();
    // }
    // var categories = this.getLocalStorage();
    // var result: Category[] = new Array();

    // for(var index = 0; index <categories.length; index++) {
    //   var entry = categories[index];
    //   if(entry && entry.name && entry.name.toUpperCase().indexOf(searchString.toUpperCase()) != -1) {
    //     result.push(entry);
    //   }
    // }
    // this.categories = result;
    // return this.categories;
  }

  // Save dummy Categories
  getDummyCategories() : Category[] {
    var dummyCategories = [
      new Category(1, 'Indian Heritage'),
      new Category(2, 'Indian Culture'),
      new Category(3, 'History of India'),
      new Category(4, 'History of World'),
      new Category(5, 'Geography of India'),
      new Category(6, 'World Geography'),
      new Category(7, 'Physical Geography'),
      new Category(8, 'Human Geography'),
      new Category(9, 'Technology'),
      new Category(10, 'Sports'),
      new Category(11, 'Economics'),
      new Category(12, 'Bio diversity'),
      new Category(13, 'Environment'),
      new Category(14, 'Security'),
      new Category(15, 'Disaster Management'),
      new Category(16, 'Governance'),
      new Category(17, 'Constitution of India'),
      new Category(18, 'Polity'),
      new Category(19, 'Social Justice'),
      new Category(20, 'International relations'),
      new Category(21, 'Parliament'),
      new Category(22, 'Executive'),
      new Category(23, 'Judiciary'),
      new Category(24, 'Supreme Court'),
      new Category(25, 'Development Process'),
      new Category(26, 'Development Industry')

    ];

    return dummyCategories;
  }

  // Get Local Storage
  getLocalStorage(): Category[] {
    return JSON.parse(localStorage.getItem(LocalStorageTable.Category));
  }

  // Reset Local Storage
  setLocalStorage(categoryArray: Category[]) {
    localStorage.setItem(LocalStorageTable.Category, JSON.stringify(categoryArray));
  }  
}
