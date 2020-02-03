import { Injectable } from '@angular/core';
import { LocalStorageTable } from '../enums/local-storage-table.enum';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public categories: Category[] = [];
  
  constructor() { }

  // Add Category
  addCategory(category: Category) {
    var categoryArray = this.getLocalStorage();
    if(categoryArray != null) {
      var maxId = Math.max.apply(Math, categoryArray.map((o:Category) => {return o.id}));
      category.id = maxId + 1;
    }
    else {
      category.id = 1;
    }
    categoryArray.push(category);
    this.setLocalStorage(categoryArray);
  }

  // Update Category
  updateCategory(category: Category) {
    console.log(category);
    if(category.id === 0) {
      this.addCategory(category);
    }
    else {
      var categoryInStore = this.getCategoryById(category.id);
      console.log(categoryInStore);
      if(categoryInStore === null) {
        category.id = 0;
        this.addCategory(category);
      }
      else {
        categoryInStore.name = category.name;
        var categoryArray = this.getLocalStorage();
        for(var i in categoryArray) {
          if(categoryArray[i].id == category.id){
            categoryArray[i].name = category.name;
          }
        }
        this.setLocalStorage(categoryArray);
      }
    }
  }

  // Delete Category
  deleteCategory(id: number) {
    var categoryArray = this.getLocalStorage();
    for(var i in categoryArray) {
      if(categoryArray[i].id === id) {
        categoryArray.splice(+i, 1);
        this.setLocalStorage(categoryArray);
      }
    }
  }

  // Get Category By Id
  getCategoryById(id: number) : Category {
    var categoryArray = this.getLocalStorage();
    var category = categoryArray.filter(category => category.id === id).pop();
    return category;
  }

  // Get all Categories
  getCategories() : Category[] {
    this.categories = this.getLocalStorage();

    if(this.categories === null || this.categories.length === 0){
      var dummyCategories = this.getDummyCategories();
      this.categories = dummyCategories;
      this.setLocalStorage(dummyCategories);
    }
    return this.categories;
  }

  // Search Categories
  getCategoriesBySearchString(searchString: string){
    if(searchString === "") {
      return this.getCategories();
    }
    var categories = this.getLocalStorage();
    var result: Category[] = new Array();

    for(var index = 0; index <categories.length; index++) {
      var entry = categories[index];
      if(entry && entry.name && entry.name.toUpperCase().indexOf(searchString.toUpperCase()) != -1) {
        result.push(entry);
      }
    }
    this.categories = result;
    return this.categories;
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
      new Category(10, 'Economics'),
      new Category(10, 'Bio diversity'),
      new Category(10, 'Environment'),
      new Category(10, 'Security'),
      new Category(10, 'Disaster Management'),
      new Category(10, 'Governance'),
      new Category(10, 'Constitution of India'),
      new Category(10, 'Polity'),
      new Category(10, 'Social Justice'),
      new Category(10, 'International relations'),
      new Category(10, 'Parliament'),
      new Category(10, 'Executive'),
      new Category(10, 'Judiciary'),
      new Category(10, 'Supreme Court'),
      new Category(10, 'Development Process'),
      new Category(10, 'Development Industry')

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
