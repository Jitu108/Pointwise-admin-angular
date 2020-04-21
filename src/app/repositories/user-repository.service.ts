import { Endpoints } from 'src/app/endpoints/endpoints';
import { UserLogin } from './../models/user-login';
import { User } from 'src/app/models/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createHttpObservable } from '../common/util';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {

    
    getById(id: number) : Observable<User> {
        return createHttpObservable(Endpoints.user.getbyid.endpoint + id);
    }

    save(id: number, user: User) : Observable<User> {
        if(id === 0){
            return createHttpObservable(
                Endpoints.user.create.endpoint, 
                Endpoints.user.create.method, 
                user, 
                Endpoints.user.create.header);
        }
        else {
            return createHttpObservable(
                Endpoints.user.update.endpoint + id, 
                Endpoints.user.update.method, 
                user, 
                Endpoints.user.update.header);
        }
    }

    login(login: UserLogin) : Observable<User> {
        const url = Endpoints.auth.authenticate.endpoint;
        const method = Endpoints.auth.authenticate.method;
        const body = login;
        const headers = Endpoints.auth.authenticate.headers;

        return Observable.create(observer => {
        
            const controller = new AbortController();
            const signal = controller.signal;
    
            fetch(url, 
                { 
                    method: method,
                    body: JSON.stringify(body),
                    headers: headers,
                    signal 
                })
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
                else if (response.status == 404){
                    return null;
                }
                else {
                    observer.error('Request failed with status code: ' + response.status);
                }
            })
            .then(body => {
                observer.next(body);
                observer.complete();
            })
            .catch( err => {
                observer.error(err);
            });
            return () => controller.abort();
        });
    }
}
