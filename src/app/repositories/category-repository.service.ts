import { Endpoints } from 'src/app/endpoints/endpoints';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { httpGet, httpPost, httpPut, httpDelete, httpPatch } from '../common/util';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class CategoryRepository {

    constructor(private http: HttpClient) {}

    getCategories() : Observable<Category[]> {
        const url = Endpoints.category.get.endpoint;
        return httpGet<Category[]>(this.http, url);
    }

    getById(id: number) : Observable<Category> {
        const url = Endpoints.category.getbyid.endpoint + id;
        return httpGet<Category>(this.http, url);
    }   

    save(id: number, category: Category) : Observable<Category> {
        const body = category;
        if(id === 0){
            const url = Endpoints.category.create.endpoint;
            return httpPost<Category>(this.http, url, body);
        }
        else {
            const url = Endpoints.category.update.endpoint + id;
            return httpPut<Category>(this.http, url, body);
        }
    }

    softDelete(id: number) : Observable<boolean> {
        const url = Endpoints.category.softdelete.endpoint + id;
        return httpDelete<boolean>(this.http, url);
    }

    undoSoftDelete(id: number) : Observable<boolean> {
        const url = Endpoints.category.undosoftdelete.endpoint + id;
        return httpPatch<boolean>(this.http, url, null);
    }
    

    delete(id: number) : Observable<boolean> {
        const url = Endpoints.category.delete.endpoint + id;
        return httpDelete<boolean>(this.http, url);
    }
}
