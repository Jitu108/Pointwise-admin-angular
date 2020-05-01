import { SourceRepository } from './../repositories/source-repository.service';
import { Injectable } from '@angular/core';
import { Source } from '../models/source';
import { map, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SourceService {
  
    private sourceListSubject = new BehaviorSubject<Source[]>([]);
    sourceList$: Observable<Source[]> = this.sourceListSubject.asObservable();

  constructor(private repository: SourceRepository) { }

  init() {
    this.repository.getSources()
    .subscribe(
        items => this.sourceListSubject.next(items)
    );
  }

  // Get all Sources
  getSources() : Observable<Source[]> {
    this.init();
    const items = this.sourceListSubject.getValue();
    return this.sourceList$;
  }

  // Save Source
  save(id: number, source: Source) : Observable<Source> {
    return this.repository.save(id, source)
    .pipe(tap(res => {
        this.init();
    }));
  }

  // Soft Delete Source
  softDelete(id: number) : Observable<boolean> {
    return this.repository.softDelete(id)
    .pipe(map(x => {
        this.init();
        return true;
    }));
  }

  // Undo Soft Delete Source
  undoSoftDelete(id: number) : Observable<boolean> {
    return this.repository.undoSoftDelete(id)
    .pipe(map(x => {
        this.init();
        return true;
    }));
  }

  // Delete Source
  delete(id: number) : Observable<boolean> {
    return this.repository.delete(id)
    .pipe(map(x => {
        this.init();
        return true;
    }));
  }

  // Get Source By Id
  getById(id: number) : Observable<Source> {
    return this.repository.getById(id)
    .pipe(tap(x => {
        this.init();
    }));
  }

  // Search Sources
  getAllBySearchString(searchString: string){
    this.init();

    return this.sourceList$
    .pipe(
      map(sources => 
        sources
        .filter(
            source => 
            source.name.toLowerCase().includes(searchString.toLowerCase())
        )
      )
    );
  }
}
