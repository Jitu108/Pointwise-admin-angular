import { Endpoints } from './../endpoints/endpoints';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter, defaultIfEmpty } from 'rxjs/operators';
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
        const http$ = createHttpObservable(Endpoints.source.getall.endpoint);

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
                map(sources => sources.find(source => source.id == id)),
                filter(source => !!source)
            )
            .pipe(defaultIfEmpty(defaultValue));
    }

    getSources() {
        var defaultValue: Source[] = [];
        return this.sources$
            .pipe(
                map(sources => {
                    return sources.filter(source => source.isDeleted == false);
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
            fromPromise(fetch(Endpoints.source.create.endpoint, {
                method: Endpoints.source.create.method,
                body: JSON.stringify(source),
                headers: Endpoints.source.create.headers
            })).subscribe(res =>{
                this.init();
            });
        }
        else {
            fromPromise(fetch(Endpoints.source.update.endpoint + id, {
                method: Endpoints.source.update.method,
                body: JSON.stringify(source),
                headers: Endpoints.source.update.headers
            })).subscribe(res =>{
                this.init();
            });
        }
    }

    softDelete(id: number) {
        fromPromise(fetch(Endpoints.source.softdelete.endpoint + id, {
            method: Endpoints.source.softdelete.method
        })).subscribe(res =>{
            this.init();
        });
    }

    undoSoftDelete(id: number) {
        fromPromise(fetch(Endpoints.source.undosoftdelete.endpoint + id, {
            method: Endpoints.source.undosoftdelete.method
        })).subscribe(res =>{
            this.init();
        });
    }
    

    delete(id: number) {
        fromPromise(fetch(Endpoints.source.delete.endpoint + id, {
            method: Endpoints.source.delete.method
        })).subscribe(res =>{
            this.init();
        });
    }
}