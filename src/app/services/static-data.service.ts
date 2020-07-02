import { StaticDataRepository } from './../repositories/static-data-repository.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StaticDataService {
    constructor(private repository: StaticDataRepository) { }

    entities =
        (): Observable<string[]> => {
            return this.repository.entities();
        }

    accesstypes =
        (): Observable<string[]> => {
            return this.repository.accesstypes();
        }
}