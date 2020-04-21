import { UserRepositoryService } from './../repositories/user-repository.service';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from '../models/user';
import { UserLogin } from '../models/user-login';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private subject = new ReplaySubject<User>();
    loggedInUser$: Observable<User> = this.subject.asObservable();
    loggedInuser: User;

  constructor(private repository: UserRepositoryService) { }

    getById(id: number) : Observable<User> {
        return this.repository.getById(id);
    }

    save(id: number, user: User) : Observable<User> {
        return this.repository.save(id, user);
    }

    login(login: UserLogin) : Observable<boolean> {
        return this.repository.login(login)
        .pipe(
            map((x:User) => {
                if(x !== null) {
                    this.loggedInuser = x;
                    this.subject.next(this.loggedInuser);
                    return true;
                }
                else {
                    return false;
                }
        }));

    }
}
