import { UserRepositoryService } from './../repositories/user-repository.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    
  constructor(private repository: UserRepositoryService) { }

    save(id: number, user: User) : Observable<User> {
        return this.repository.save(id, user);
    }
}
