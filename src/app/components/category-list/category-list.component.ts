import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  public Resources = {
    Header: "Categories",
    SearchPlaceholder:"Search",
    AddToolTip: "Add Category",
    AddCaption: "Category",
    EditCaption: "Edit",
    DeleteCaption: "Delete",
    TableHeaders: {
      SlColumn: "#",
      NameColumn: "Name",
      ActionColumn: "Action"
    }
  }

  public categories: Category[] = [];
  search: string;
  constructor(private router: Router, private categoryService: CategoryService) { }

  ngOnInit() {
    debugger;
    this.getCategories();
  }

  // Load all Categories
  getCategories() {
    console.log("getCategories Called - Component");
    this.categories = this.categoryService.getCategories();
    console.log(this.categories);
    return this.categories;
  }

  // Add Category
  addCategory() {
    this.router.navigate(['/category-detail']);
    console.log("Add Category");
  }

  // Edit Category
  editCategory(id: number) {
    console.log("Edit Category : " + id);
    this.router.navigate(['/category-detail'], {queryParams: {id: id}});
  }

  // Delete Category
  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id);
    this.getCategories();
  }

  searchCategory(searchString: string) {
    this.categories = this.categoryService.getCategoriesBySearchString(searchString);
    console.log(searchString);
  }

}
