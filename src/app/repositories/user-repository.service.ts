import { Endpoints } from 'src/app/endpoints/endpoints';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { httpPost, httpPut, httpGet, httpDelete, httpPatch } from '../common/util';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {

    constructor(private http: HttpClient) {}

    getUsers() : Observable<User[]> {
        const url = Endpoints.user.get.endpoint;
        return httpGet<User[]>(this.http, url);
    }

    getById(id: number) : Observable<User> {
        const url = Endpoints.user.getbyid.endpoint + id;
        return httpGet<User>(this.http, url);
    } 

    save(id: number, user: User) : Observable<User> {
        const body = user;
        if(id === 0){
            const url = Endpoints.user.create.endpoint;
            return httpPost<User>(this.http, url, body);
        }
        else {
            const url = Endpoints.user.update.endpoint + id;
            return httpPut<User>(this.http, url, body);
        }
    }

    block(id: number) : Observable<boolean> {
        const url = Endpoints.user.block.endpoint + id;
        return httpPatch<boolean>(this.http, url, null);
    }

    unblock(id: number) : Observable<boolean> {
        const url = Endpoints.user.unblock.endpoint + id;
        return httpPatch<boolean>(this.http, url, null);
    }
}
