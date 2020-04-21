import { Endpoints } from 'src/app/endpoints/endpoints';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { map, filter, defaultIfEmpty } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import {fromPromise} from 'rxjs/internal-compatibility';



@Injectable({
    providedIn: 'root'
})

export class CategoryRepository {

    private subject = new BehaviorSubject<Category[]>([]);

    categories$: Observable<Category[]> = this.subject.asObservable();

    init() {
        //const http$ = createHttpObservable('/api/categories/all');
        const http$ = createHttpObservable(Endpoints.category.getall.endpoint);

        http$
            .pipe(
                map(res => Object.values(res))
            )
            .subscribe(
                
                categories => {
                    console.log(categories);
                    this.subject.next(categories);
                }
            );
    }

    getById(id: number) {
        var defaultValue: Category = new Category(0, '', false);
        return this.categories$
            .pipe(
                map(categories => categories.find(category => category.id == id)),
                filter(category => !!category)
            )
            .pipe(defaultIfEmpty(defaultValue));
    }

    getCategories() {
        var defaultValue: Category[] = [];
        return this.categories$
            .pipe(
                map(categories => categories.filter(category => category.isDeleted == false)),
                filter(category => !!category)
            )
            .pipe(defaultIfEmpty(defaultValue));

    }

    getAllCategories() {
        const categories = this.subject.getValue();
        return this.categories$;
    }

    save(id: number, category: Category) {
        if(id === 0){
            fromPromise(fetch(Endpoints.category.create.endpoint, {
                method: Endpoints.category.create.method,
                body: JSON.stringify(category),
                headers: Endpoints.category.create.headers
            })).subscribe(res =>{
                this.init();
            });
        }
        else {
            fromPromise(fetch( Endpoints.category.update.endpoint + id, {
                method: Endpoints.category.update.method,
                body: JSON.stringify(category),
                headers: Endpoints.category.update.headers
            })).subscribe(res =>{
                this.init();
            });
        }
    }

    softDelete(id: number) {
        fromPromise(fetch(Endpoints.category.softdelete.endpoint + id, {
            method: Endpoints.category.softdelete.method
        })).subscribe(res =>{
            this.init();
        });
    }

    undoSoftDelete(id: number) {
        fromPromise(fetch(Endpoints.category.undosoftdelete.endpoint + id, {
            method: Endpoints.category.undosoftdelete.method
        })).subscribe(res =>{
            this.init();
        });
    }
    

    delete(id: number) {
        fromPromise(fetch(Endpoints.category.delete.endpoint + id, {
            method: Endpoints.category.delete.method
        })).subscribe(res =>{
            this.init();
        });
    }
}
