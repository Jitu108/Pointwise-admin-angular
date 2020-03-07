import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map, filter, defaultIfEmpty } from 'rxjs/operators';
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
        const http$ = createHttpObservable('/api/Tags/All');

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
                map(tags => tags.find(tag => tag.Id == id)),
                filter(tag => !!tag)
            )
            .pipe(defaultIfEmpty(defaultValue));
    }

    getTags() {
        var defaultValue: Tag[] = [];
        return this.tags$
            .pipe(
                map(tags => tags.filter(tag => tag.IsDeleted == false)),
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
            fromPromise(fetch(`api/Tags`, {
                method: 'POST',
                body: JSON.stringify(tag),
                headers: {
                    'content-type': 'application/json'
                }
            })).subscribe(res =>{
                this.init();
            });
        }
        else {
            fromPromise(fetch(`/api/Tags/${id}`, {
                method: 'PUT',
                body: JSON.stringify(tag),
                headers: {
                    'content-type': 'application/json'
                }
            })).subscribe(res =>{
                this.init();
            });
        }
    }

    softDelete(id: number) {
        fromPromise(fetch(`/api/Tags/SoftDelete?id=${id}`, {
            method: 'DELETE'
        })).subscribe(res =>{
            this.init();
        });
    }

    undoSoftDelete(id: number) {
        fromPromise(fetch(`/api/Tags/UndoSoftDelete?id=${id}`, {
            method: 'DELETE'
        })).subscribe(res =>{
            this.init();
        });
    }
    

    delete(id: number) {
        fromPromise(fetch(`/api/Tags/${id}`, {
            method: 'DELETE'
        })).subscribe(res =>{
            this.init();
        });
    }
}