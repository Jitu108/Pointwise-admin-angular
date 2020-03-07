import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map, filter, defaultIfEmpty } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import {fromPromise} from 'rxjs/internal-compatibility';
import { Source } from '../models/source';



@Injectable({
    providedIn: 'root'
})
export class SourceRepository {

    private subject = new BehaviorSubject<Source[]>([]);

    sources$: Observable<Source[]> = this.subject.asObservable();

    init() {
        const http$ = createHttpObservable('/api/Sources/All');

        http$
            .pipe(
                //tap(() => console.log('HTTP request executed - - Source')),
                map(res => Object.values(res))
            )
            .subscribe(
                sources => this.subject.next(sources)
            );
    }

    getById(id: number) {
        var defaultValue: Source = new Source(0, '', false);
        return this.sources$
            .pipe(
                map(sources => sources.find(source => source.Id == id)),
                filter(source => !!source)
            )
            .pipe(defaultIfEmpty(defaultValue));
    }

    getSources() {
        var defaultValue: Source[] = [];
        return this.sources$
            .pipe(
                map(sources => {
                    return sources.filter(source => source.IsDeleted == false);
                }),
                filter(source => !!source)
            )
            .pipe(defaultIfEmpty(defaultValue));

    }

    getAllSources() {
        const sources = this.subject.getValue();
        return this.sources$;
    }

    save(id: number, source: Source) {
        if(id === 0){
            fromPromise(fetch(`api/Sources`, {
                method: 'POST',
                body: JSON.stringify(source),
                headers: {
                    'content-type': 'application/json'
                }
            })).subscribe(res =>{
                this.init();
            });
        }
        else {
            fromPromise(fetch(`/api/Sources/${id}`, {
                method: 'PUT',
                body: JSON.stringify(source),
                headers: {
                    'content-type': 'application/json'
                }
            })).subscribe(res =>{
                this.init();
            });
        }
    }

    softDelete(id: number) {
        fromPromise(fetch(`/api/Sources/SoftDelete?id=${id}`, {
            method: 'DELETE'
        })).subscribe(res =>{
            this.init();
        });
    }

    undoSoftDelete(id: number) {
        fromPromise(fetch(`/api/Sources/UndoSoftDelete?id=${id}`, {
            method: 'DELETE'
        })).subscribe(res =>{
            this.init();
        });
    }
    

    delete(id: number) {
        fromPromise(fetch(`/api/Sources/${id}`, {
            method: 'DELETE'
        })).subscribe(res =>{
            this.init();
        });
    }
}