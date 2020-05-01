import { map, tap } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CategoryRepository } from '../repositories/category-repository.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
    private categoryListSubject = new BehaviorSubject<Category[]>([]);
    categoryList$: Observable<Category[]> = this.categoryListSubject.asObservable();

  constructor(private repository: CategoryRepository) { }

  init() {
    this.repository.getCategories()
    .subscribe(
        items => this.categoryListSubject.next(items)
    );
  }

  // Get all Categories
  getCategories() : Observable<Category[]> {
      this.init();
    const items = this.categoryListSubject.getValue();
    return this.categoryList$;
  }  
  // Save Category
  save(id: number, category: Category) : Observable<Category>{
    return this.repository.save(id, category)
    .pipe(tap(res => {
        this.init();
    }));
  }

  // Soft Delete Category
  softDelete(id: number) : Observable<boolean>{
    return this.repository.softDelete(id)
    .pipe(map(x => {
        this.init();
        return true;
    }));
  }

  // Undo Soft Delete Category
  undoSoftDelete(id: number) : Observable<boolean> {
    return this.repository.undoSoftDelete(id)
    .pipe(map(x => {
        this.init();
        return true;
    }));
  }

  // Delete Category
  delete(id: number) : Observable<boolean>{
    return this.repository.delete(id)
    .pipe(map(x => {
        this.init();
        return true;
    }));
  }

  // Get Category By Id
  getById(id: number) : Observable<Category> {
    return this.repository.getById(id)
    .pipe(tap(x => {
        this.init();
    }));
  }

  // Search Categories
  getAllBySearchString(searchString: string){
    this.init();

    return this.categoryList$.pipe(
      map(categories => categories.filter(category => category.name.toLowerCase().includes(searchString.toLowerCase())))
    );
  }
}
