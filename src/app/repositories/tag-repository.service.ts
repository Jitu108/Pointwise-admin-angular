import { Endpoints } from './../endpoints/endpoints';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { httpGet, httpPost, httpPut, httpPatch, httpDelete } from '../common/util';
import { Tag } from '../models/tag';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TagRepository {

    constructor(private http: HttpClient) {}

    getTags() : Observable<Tag[]> {
        const url = Endpoints.tag.get.endpoint;
        return httpGet<Tag[]>(this.http, url);
    }

    getById(id: number) : Observable<Tag> {
        const url = Endpoints.tag.getbyid.endpoint + id;
        return httpGet<Tag>(this.http, url);
    }   

    save(id: number, tag: Tag) : Observable<Tag> {
        const body = tag;
        if(id === 0){
            const url = Endpoints.tag.create.endpoint;
            return httpPost<Tag>(this.http, url, body);
        }
        else {
            const url = Endpoints.tag.update.endpoint + id;
            return httpPut<Tag>(this.http, url, body);
        }
    }

    softDelete(id: number) : Observable<boolean> {
        const url = Endpoints.tag.softdelete.endpoint + id;
        return httpDelete<boolean>(this.http, url);
    }

    undoSoftDelete(id: number) : Observable<boolean> {
        const url = Endpoints.tag.undosoftdelete.endpoint + id;
        return httpPatch<boolean>(this.http, url, null);
    }
    
    delete(id: number) : Observable<boolean> {
        const url = Endpoints.tag.delete.endpoint + id;
        return httpDelete<boolean>(this.http, url);
    }
}