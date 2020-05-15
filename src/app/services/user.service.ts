import { UserRepositoryService } from './../repositories/user-repository.service';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private userListSubject = new BehaviorSubject<User[]>([]);
    userList$: Observable<User[]> = this.userListSubject.asObservable();
    
    constructor(private repository: UserRepositoryService) { }

    init() {
        this.repository.getUsers()
        .subscribe(
            items => this.userListSubject.next(items)
        );
    }

    // Get all Users
    getUsers() : Observable<User[]> {
        this.init();
        const items = this.userListSubject.getValue();
        return this.userList$;
    } 

    save(id: number, user: User) : Observable<User> {
        return this.repository.save(id, user)
            .pipe(tap(res => {
                this.init();
        }));
    }

    // Soft Delete User
    block(id: number) : Observable<boolean>{
        return this.repository.block(id)
        .pipe(map(x => {
            this.init();
            return true;
        }));
    }

    // Undo Soft Delete User
    unblock(id: number) : Observable<boolean> {
        return this.repository.unblock(id)
        .pipe(map(x => {
            this.init();
            return true;
        }));
    }

    // Get User By Id
  getById(id: number) : Observable<User> {
    return this.repository.getById(id)
    .pipe(tap(x => {
        this.init();
    }));
  }

  // Search Users
  getAllBySearchString(searchString: string){
    this.init();

    return this.userList$.pipe(
      map(users => 
        users.filter(user => 
        user.firstName.toLowerCase().includes(searchString.toLowerCase())
        || user.middleName.toLowerCase().includes(searchString.toLowerCase())
        || user.lastName.toLowerCase().includes(searchString.toLowerCase())
        || user.emailAddress.toLowerCase().includes(searchString.toLowerCase())
        ))
    );
  }
}
