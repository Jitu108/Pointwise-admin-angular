import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { tap, map, filter, defaultIfEmpty } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import {fromPromise} from 'rxjs/internal-compatibility';



@Injectable({
    providedIn: 'root'
})

export class CategoryRepository {

    private subject = new BehaviorSubject<Category[]>([]);

    categories$: Observable<Category[]> = this.subject.asObservable();

    init() {
        const http$ = createHttpObservable('/api/Categories/All');

        http$
            .pipe(
                map(res => Object.values(res))
            )
            .subscribe(
                categories => this.subject.next(categories)
            );
    }

    getById(id: number) {
        var defaultValue: Category = new Category(0, '', false);
        return this.categories$
            .pipe(
                map(categories => categories.find(category => category.Id == id)),
                filter(category => !!category)
            )
            .pipe(defaultIfEmpty(defaultValue));
    }

    getCategories() {
        var defaultValue: Category[] = [];
        return this.categories$
            .pipe(
                map(categories => categories.filter(category => category.IsDeleted == false)),
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
            fromPromise(fetch(`api/Categories`, {
                method: 'POST',
                body: JSON.stringify(category),
                headers: {
                    'content-type': 'application/json'
                }
            })).subscribe(res =>{
                this.init();
            });
        }
        else {
            fromPromise(fetch(`/api/Categories/${id}`, {
                method: 'PUT',
                body: JSON.stringify(category),
                headers: {
                    'content-type': 'application/json'
                }
            })).subscribe(res =>{
                this.init();
            });
        }
    }

    softDelete(id: number) {
        fromPromise(fetch(`/api/Categories/SoftDelete?id=${id}`, {
            method: 'DELETE'
        })).subscribe(res =>{
            this.init();
        });
    }

    undoSoftDelete(id: number) {
        fromPromise(fetch(`/api/Categories/UndoSoftDelete?id=${id}`, {
            method: 'DELETE'
        })).subscribe(res =>{
            this.init();
        });
    }
    

    delete(id: number) {
        fromPromise(fetch(`/api/Categories/${id}`, {
            method: 'DELETE'
        })).subscribe(res =>{
            this.init();
        });
    }
}