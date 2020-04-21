import { Endpoints } from './../endpoints/endpoints';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter, defaultIfEmpty } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import {fromPromise} from 'rxjs/internal-compatibility';
import { Tag } from '../models/tag';



@Injectable({
    providedIn: 'root'
})
export class TagRepository {

    private subject = new BehaviorSubject<Tag[]>([]);

    tags$: Observable<Tag[]> = this.subject.asObservable();

    init() {
        const http$ = createHttpObservable(Endpoints.tag.getall.endpoint);

        http$
            .pipe(
                map(res => Object.values(res))
            )
            .subscribe(
                tags => this.subject.next(tags)
            );
    }

    getById(id: number) {
        var defaultValue: Tag = new Tag(0, '', false);
        return this.tags$
            .pipe(
                map(tags => tags.find(tag => tag.id == id)),
                filter(tag => !!tag)
            )
            .pipe(defaultIfEmpty(defaultValue));
    }

    getTags() {
        var defaultValue: Tag[] = [];
        return this.tags$
            .pipe(
                map(tags => tags.filter(tag => tag.isDeleted == false)),
                filter(tag => !!tag)
            )
            .pipe(defaultIfEmpty(defaultValue));

    }

    getAllTags() {
        const tags = this.subject.getValue();
        return this.tags$;
    }

    save(id: number, tag: Tag) {
        if(id === 0){
            fromPromise(fetch(Endpoints.tag.create.endpoint, {
                method: Endpoints.tag.create.method,
                body: JSON.stringify(tag),
                headers: Endpoints.tag.create.headers
            })).subscribe(res =>{
                this.init();
            });
        }
        else {
            fromPromise(fetch(Endpoints.tag.update.endpoint + id, {
                method: Endpoints.tag.update.method,
                body: JSON.stringify(tag),
                headers: Endpoints.tag.update.headers
            })).subscribe(res =>{
                this.init();
            });
        }
    }

    softDelete(id: number) {
        fromPromise(fetch(Endpoints.tag.softdelete.endpoint + id, {
            method: Endpoints.tag.softdelete.method
        })).subscribe(res =>{
            this.init();
        });
    }

    undoSoftDelete(id: number) {
        fromPromise(fetch(Endpoints.tag.undosoftdelete.endpoint + id, {
            method: Endpoints.tag.undosoftdelete.method
        })).subscribe(res =>{
            this.init();
        });
    }
    

    delete(id: number) {
        fromPromise(fetch(Endpoints.tag.delete.endpoint + id, {
            method: Endpoints.tag.delete.method
        })).subscribe(res =>{
            this.init();
        });
    }
}