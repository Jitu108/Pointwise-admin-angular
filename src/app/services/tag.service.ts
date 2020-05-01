import { TagRepository } from './../repositories/tag-repository.service';
import { Tag } from './../models/tag';
import { Injectable } from '@angular/core'
import { map, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

    private tagListSubject = new BehaviorSubject<Tag[]>([]);
    tagList$: Observable<Tag[]> = this.tagListSubject.asObservable();

  constructor(private repository: TagRepository) { }

  init() {
    this.repository.getTags()
    .subscribe(
        items => this.tagListSubject.next(items)
    );
  }

  // Get all Tags
  getTags() : Observable<Tag[]> {
    this.init();
    const items = this.tagListSubject.getValue();
    return this.tagList$;
  }

  // Save Tag
  save(id: number, tag: Tag) : Observable<Tag> {
    return this.repository.save(id, tag)
    .pipe(tap(res => {
        this.init();
    }));
  }

  // Soft Delete Tag
  softDelete(id: number) : Observable<boolean> {
    return this.repository.softDelete(id)
    .pipe(map(x => {
        this.init();
        return true;
    }));
  }

  // Undo Soft Delete Tag
  undoSoftDelete(id: number) : Observable<boolean> {
    return this.repository.undoSoftDelete(id)
    .pipe(map(x => {
        this.init();
        return true;
    }));
  }

  // Delete Tag
  delete(id: number) : Observable<boolean> {
    return this.repository.delete(id)
    .pipe(map(x => {
        this.init();
        return true;
    }));
  }

  // Get Tag By Id
  getById(id: number) : Observable<Tag> {
    return this.repository.getById(id)
    .pipe(tap(x => {
        this.init();
    }));
  }

  // Search Tags
  getAllBySearchString(searchString: string){
    this.init();

    return this.tagList$.pipe(
      map(tags => tags.filter(source => source.name.toLowerCase().includes(searchString.toLowerCase())))
    );
  }
  
}
