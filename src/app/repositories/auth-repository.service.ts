import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createHttpObservable, httpPost } from '../common/util';
import { AuthUser } from '../models/auth-user';
import { UserLogin } from '../models/user-login';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../endpoints/endpoints';

@Injectable({
    providedIn: 'root'
  })
  export class AuthRepositoryService {
    constructor(private http: HttpClient) {}
    getById(id: number) : Observable<AuthUser> {
        return createHttpObservable(Endpoints.user.getbyid.endpoint + id);
    }

    login(login: UserLogin) : Observable<AuthUser> {
        const url = Endpoints.auth.authenticate.endpoint;
        const body = login;
        const headers = Endpoints.auth.authenticate.headers;

        return httpPost<AuthUser>(this.http, url, body, headers);
    }
  }