import { Endpoints } from 'src/app/endpoints/endpoints';
import { User } from 'src/app/models/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { httpPost, httpPut } from '../common/util';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {

    constructor(private http: HttpClient) {}

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
}
