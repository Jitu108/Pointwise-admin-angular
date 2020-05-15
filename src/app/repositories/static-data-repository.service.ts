import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from '../endpoints/endpoints';
import { httpGet } from '../common/util';

@Injectable({
    providedIn: 'root'
  })
  export class StaticDataRepository {
    constructor(private http: HttpClient) {}

    entities() : Observable<string[]> {
        const url = Endpoints.staticdata.entities.endpoint;
        return httpGet<string[]>(this.http, url);
    }

    accesstypes() : Observable<string[]> {
        const url = Endpoints.staticdata.accesstypes.endpoint;
        return httpGet<string[]>(this.http, url);
    }
  }