import { Article } from './../models/article';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Endpoints } from '../endpoints/endpoints';
import { httpGet, httpPost, httpPut, httpDelete, httpPatch } from '../common/util';

@Injectable({
    providedIn: 'root'
})

export class ArticleRepository {

    constructor(private http: HttpClient) {}

    getArticles() : Observable<Article[]> {
        const url = Endpoints.article.get.endpoint;
        return httpGet<Article[]>(this.http, url);
    }

    getById(id: number) : Observable<Article> {
        const url = Endpoints.article.getbyid.endpoint + id;
        return httpGet<Article>(this.http, url);
    }

    save(id: number, article: Article): Observable<Article> {
        const body = article;

        if(id == 0) {
            const url = Endpoints.article.create.endpoint;
            return httpPost<Article>(this.http, url, body);
        }
        else {
            const url = Endpoints.article.update.endpoint + id;
            return httpPut<Article>(this.http, url, body);
        }
    }

    softDelete(id: number): Observable<boolean> {
        const url = Endpoints.article.softdelete.endpoint + id;
        return httpDelete<boolean>(this.http, url);
    }

    undoSoftDelete(id: number): Observable<boolean> {
        const url = Endpoints.article.undosoftdelete.endpoint + id;
        return httpPatch<boolean>(this.http, url, null);
    }
    
    delete(id: number): Observable<boolean> {
        const url = Endpoints.article.delete.endpoint + id;
        return httpDelete<boolean>(this.http, url);
    }
}