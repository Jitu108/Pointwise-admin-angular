import { map } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CategoryRepository } from '../repositories/category-repository.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  constructor(private repository: CategoryRepository) { }


  // Save Category
  save(id: number, category: Category) {
    return this.repository.save(id, category);
  }

  // Soft Delete Category
  softDelete(id: number) {
    return this.repository.softDelete(id);
  }

  // Undo Soft Delete Category
  undoSoftDelete(id: number) {
    return this.repository.undoSoftDelete(id);
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
  getAllCategories() : Observable<Category[]> {
    var categories$ = this.repository.getAllCategories();
    return categories$;
  }

    // Get all Categories - Non-soft deleted
    getCategories() : Observable<Category[]> {
      var categories$ = this.repository.getCategories();
      return categories$;
    }

  // Search Categories
  getAllBySearchString(searchString: string){
    var categories$ = this.repository.getAllCategories();

    return categories$.pipe(
      map(categories => categories.filter(category => category.name.toLowerCase().includes(searchString.toLowerCase())))
    );
  }
}
