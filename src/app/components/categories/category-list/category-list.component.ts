import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

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
    SoftDeleteCaption: "Soft Delete",
    UndoSoftDeleteCaption: "Undo Soft Delete",
    DeleteCaption: "Delete",
    TableHeaders: {
      SlColumn: "#",
      NameColumn: "Name",
      DeletedColumn: "IsDeleted?",
      ActionColumn: "Action"
    }
  }

  public categories$: Observable<Category[]>;
  search: string;
  constructor(
    private router: Router, 
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  // Load all Categories
  getCategories() {
    this.categories$ = this.categoryService.getAllCategories();
    return this.categories$;
  }

  // Add Category
  addCategory() {
    this.router.navigate(['/categories/detail']);
  }

  // Edit Category
  editCategory(id: number) {
    this.router.navigate(['/categories/detail'], {queryParams: {id: id}});
  }

  // Soft Delete Category
  softDeleteCategory(id: number) {
    this.categoryService.softDelete(id);
  }

  // Undo Soft Delete Category
  undoSoftDeleteCategory(id: number) {
    this.categoryService.undoSoftDelete(id);
  }

  // Delete Category
  deleteCategory(id: number) {
    this.categoryService.delete(id);
  }

  searchCategory(searchString: string) {
    this.categories$ = this.categoryService.getAllBySearchString(searchString);
  }
}
