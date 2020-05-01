import { Source } from './../models/source';
import { Endpoints } from './../endpoints/endpoints';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { httpGet, httpPost, httpPut, httpDelete, httpPatch } from '../common/util';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SourceRepository {

    constructor(private http: HttpClient) {}

    getSources() : Observable<Source[]> {
        const url = Endpoints.source.get.endpoint;
        return httpGet<Source[]>(this.http, url);
    }

    getById(id: number) : Observable<Source> {
        const url = Endpoints.source.getbyid.endpoint + id;
        return httpGet<Source>(this.http, url);
    }   

    save(id: number, source: Source) : Observable<Source> {
        const body = source;
        if(id === 0){
            const url = Endpoints.source.create.endpoint;
            return httpPost<Source>(this.http, url, body);
        }
        else {
            const url = Endpoints.source.update.endpoint + id;
            return httpPut<Source>(this.http, url, body);
        }
    }

    softDelete(id: number) : Observable<boolean> {
        const url = Endpoints.source.softdelete.endpoint + id;
        return httpDelete<boolean>(this.http, url);
    }

    undoSoftDelete(id: number) : Observable<boolean> {
        const url = Endpoints.source.undosoftdelete.endpoint + id;
        return httpPatch<boolean>(this.http, url, null);
    }
    
    delete(id: number) : Observable<boolean> {
        const url = Endpoints.source.delete.endpoint + id;
        return httpDelete<boolean>(this.http, url);
    }
}