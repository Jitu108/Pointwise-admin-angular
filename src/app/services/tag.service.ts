import { TagRepository } from './../repositories/tag-repository.service';
import { Tag } from './../models/tag';
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  public tags: Tag[] = [];

  constructor(private repository: TagRepository) { }

  // Save Tag
  save(id: number, source: Tag) {
    return this.repository.save(id, source);
  }

  // Soft Delete Tag
  softDelete(id: number) {
    return this.repository.softDelete(id);
  }

  // Undo Soft Delete Tag
  undoSoftDelete(id: number) {
    return this.repository.undoSoftDelete(id);
  }

  // Delete Tag
  delete(id: number) {
    return this.repository.delete(id);
  }

  // Get Tag By Id
  getById(id: number) : Observable<Tag> {
    return this.repository.getById(id);
  }

  // Get all Tags
  getAllTags() : Observable<Tag[]> {
    var tags$ = this.repository.getAllTags();
    return tags$;
  }

    // Get all Tags - Non-soft deleted
    getTags() : Observable<Tag[]> {
      var tags$ = this.repository.getTags();
      return tags$;
    }

  // Search Tags
  getAllBySearchString(searchString: string){
    var tags$ = this.repository.getAllTags();

    return tags$.pipe(
      map(tags => tags.filter(source => source.name.toLowerCase().includes(searchString.toLowerCase())))
    );
  }
  
}
