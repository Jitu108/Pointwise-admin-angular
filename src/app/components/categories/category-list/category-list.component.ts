import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { EntityType, AccessType } from 'src/app/common/enum';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenMatSnackBar } from 'src/app/common/mat-items';

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
    SoftDeleteMessage: "Category deleted successfully.",
    UndoSoftDeleteCaption: "Undo Soft Delete",
    UndoSoftDeleteMessage: "Category deletion undone.",
    DeleteCaption: "Delete",
    DeleteMessage: "Category deleted permanently.",
    TableHeaders: {
      SlColumn: "#",
      NameColumn: "Name",
      DeletedColumn: "IsDeleted?",
      ActionColumn: "Action"
    }
  }

  public categories$: Observable<Category[]>;
  public isEditable: boolean = false;
  public isSoftDeletable: boolean = false;
  public isUndoSoftDeletable: boolean = false;
  public isDeletable: boolean = false;

  constructor(
    private router: Router, 
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    public authService: AuthService) { }

  ngOnInit() {
    this.isEditable = this.authService.hasRight(EntityType.Category, AccessType.Update);
    this.isSoftDeletable = this.authService.hasRight(EntityType.Category, AccessType.SoftDelete);
    this.isUndoSoftDeletable = this.authService.hasRight(EntityType.Category, AccessType.UndoSoftDelete);
    this.isDeletable = this.authService.hasRight(EntityType.Category, AccessType.Delete);
    this.getCategories();
  }

  // Load all Categories
  getCategories() {
    this.categories$ = this.categoryService.getCategories();
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
    this.categoryService.softDelete(id)
    .subscribe(x => {
        this.getCategories();
        OpenMatSnackBar(this.snackBar, this.Resources.SoftDeleteMessage);
    });
  }

  // Undo Soft Delete Category
  undoSoftDeleteCategory(id: number) {
    this.categoryService.undoSoftDelete(id)
    .subscribe(x => {
        this.getCategories();
        OpenMatSnackBar(this.snackBar, this.Resources.UndoSoftDeleteMessage);
    });
  }

  // Delete Category
  deleteCategory(id: number) {
    this.categoryService.delete(id)
    .subscribe(x => {
        this.getCategories();
        OpenMatSnackBar(this.snackBar, this.Resources.DeleteMessage);
    });
  }

  searchCategory(searchString: string) {
    this.categories$ = this.categoryService.getAllBySearchString(searchString);
  }
}
