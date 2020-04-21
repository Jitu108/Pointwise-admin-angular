import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { Article } from 'src/app/models/article';
import { tap, map, filter, defaultIfEmpty } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import {fromPromise} from 'rxjs/internal-compatibility';



@Injectable({
    providedIn: 'root'
})

export class ArticleRepository {

    private subject = new BehaviorSubject<Article[]>([]);

    articles$: Observable<Article[]> = this.subject.asObservable();

    init() {
        const http$ = createHttpObservable('/api/articles');

        http$
            .pipe(
                map(res => Object.values(res))
            )
            .subscribe(
                articles => this.subject.next(articles)
            );
    }

    getById(id: number) : Observable<Article> {
        return createHttpObservable(`/api/articles/${id}`);
        
        // var defaultValue: Article = new Article(0);
        // return this.articles$
        //     .pipe(
        //         map(articles => articles.find(article => article.ArticleId == id)),
        //         filter(article => !!article)
        //     )
        //     .pipe(defaultIfEmpty(defaultValue));
    }

    getArticles() {
        var defaultValue: Article[] = [];
        return this.articles$
            .pipe(
                map(articles => articles.filter(article => article.articleIsDeleted == false)),
                filter(article => !!article)
            )
            .pipe(defaultIfEmpty(defaultValue));

    }

    getAllArticles() {
        const articles = this.subject.getValue();

        return this.articles$;
    }

    save(id: number, article: Article) {
        console.log(JSON.stringify(article));
        if(id === 0){
            fromPromise(fetch(`api/articles`, {
                method: 'POST',
                body: JSON.stringify(article),
                headers: {
                    'content-type': 'application/json'
                }
            })).subscribe(res =>{
                this.init();
            });
        }
        else {
            fromPromise(fetch(`/api/articles/${id}`, {
                method: 'PUT',
                body: JSON.stringify(article),
                headers: {
                    'content-type': 'application/json'
                }
            })).subscribe(res =>{
                this.init();
            });
        }
    }

    softDelete(id: number): Observable<boolean> {
        const isDeleted$ = fromPromise(fetch(`/api/articles/softdelete/${id}`, {
            method: 'DELETE'
        }))
        .pipe(map(res => res.ok));

        isDeleted$.subscribe(res =>{
            this.init();
        });

        return isDeleted$;
    }

    undoSoftDelete(id: number): Observable<boolean> {
        const isUndoDeleted$ = fromPromise(fetch(`/api/articles/undosoftdelete/${id}`, {
            method: 'PATCH'
        }))
        .pipe(map(res => res.ok));

        isUndoDeleted$.subscribe(res =>{
            this.init();
        });

        return isUndoDeleted$;
    }
    

    delete(id: number): Observable<boolean> {
        const isDeleted$ = fromPromise(fetch(`/api/articles/${id}`, {
            method: 'DELETE'
        }))
        .pipe(map(res => res.ok));
        
        isDeleted$.subscribe(res =>{
            this.init();
        });

        return isDeleted$;
    }
}