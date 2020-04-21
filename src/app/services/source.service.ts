import { SourceRepository } from './../repositories/source-repository.service';
import { Injectable } from '@angular/core';
import { Source } from '../models/source';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SourceService {
  
  public sources: Source[] = [];
  constructor(private repository: SourceRepository) { }

  // Save Source
  save(id: number, source: Source) {
    return this.repository.save(id, source);
  }

  // Soft Delete Source
  softDelete(id: number) {
    return this.repository.softDelete(id);
  }

  // Undo Soft Delete Source
  undoSoftDelete(id: number) {
    return this.repository.undoSoftDelete(id);
  }

  // Delete Source
  delete(id: number) {
    return this.repository.delete(id);
  }

  // Get Source By Id
  getById(id: number) : Observable<Source> {
    return this.repository.getById(id);
  }

  // Get all Sources
  getAllSources() : Observable<Source[]> {
    var sources$ = this.repository.getAllSources();
    return sources$;
  }

    // Get all Sources - Non-soft deleted
    getSources() : Observable<Source[]> {
      var sources$ = this.repository.getSources();
      return sources$;
    }

  // Search Sources
  getAllBySearchString(searchString: string){
    var sources$ = this.repository.getAllSources();

    return sources$.pipe(
      map(sources => sources.filter(source => source.name.toLowerCase().includes(searchString.toLowerCase())))
    );
  }

  // Add Source
  // addSource(source: Source) {
  //   var sourceArray = this.getLocalStorage();
  //   if(sourceArray != null) {
  //     var maxId = Math.max.apply(Math, sourceArray.map((o:Source) => {return o.id}));
  //     source.id = maxId + 1;
  //   }
  //   else {
  //     source.id = 1;
  //   }
  //   sourceArray.push(source);
  //   this.setLocalStorage(sourceArray);
  // }

  // Update Source
  // updateSource(source: Source) {
  //   if(source.id === 0) {
  //     this.addSource(source);
  //   }
  //   else {
  //     var sourceInStore = this.getSourceById(source.id);
  //     if(sourceInStore === null) {
  //       source.id = 0;
  //       this.addSource(source);
  //     }
  //     else {
  //       sourceInStore.name = source.name;
  //       var sourceArray = this.getLocalStorage();
  //       for(var i in sourceArray) {
  //         if(sourceArray[i].id == source.id){
  //           sourceArray[i].name = source.name;
  //         }
  //       }
  //       this.setLocalStorage(sourceArray);
  //     }
  //   }
  // }

  // Delete Source
  // deleteSource(id: number) {
  //   var sourceArray = this.getLocalStorage();
  //   for(var i in sourceArray) {
  //     if(sourceArray[i].id === id) {
  //       sourceArray.splice(+i, 1);
  //       this.setLocalStorage(sourceArray);
  //     }
  //   }
  // }

  // Get Source By Id
  // getSourceById(id: number) : Source {
  //   var sourceArray = this.getLocalStorage();
  //   var source = sourceArray.filter(source => source.id === id).pop();
  //   return source;
  // }

  // Get all Sources
  // getSources() : Source[] {
  //   this.sources = this.getLocalStorage();

  //   if(this.sources === null || this.sources.length === 0){
  //     var dummySources = this.getDummySources();
  //     this.sources = dummySources;
  //     this.setLocalStorage(dummySources);
  //   }
  //   return this.sources;
  // }

  // Search Sources
  // getSourcesBySearchString(searchString: string){
  //   if(searchString === "") {
  //     return this.getSources();
  //   }
  //   var sources = this.getLocalStorage();
  //   var result: Source[] = new Array();

  //   for(var index = 0; index <sources.length; index++) {
  //     var entry = sources[index];
  //     if(entry && entry.name && entry.name.toUpperCase().indexOf(searchString.toUpperCase()) != -1) {
  //       result.push(entry);
  //     }
  //   }
  //   this.sources = result;
  //   return this.sources;
  // }

  // Save dummy Sources
  // getDummySources() : Source[] {
  //   var dummySources = [
  //     new Source(1, 'Press Information Bureau'),
  //     new Source(2, 'The Hindu'),
  //     new Source(3, 'The Indian Express')
  //   ];

  //   return dummySources;
  // }

  // Get Local Storage
  // getLocalStorage(): Source[] {
  //   return JSON.parse(localStorage.getItem(LocalStorageTable.Source));
  // }

  // Reset Local Storage
  // setLocalStorage(sourceArray: Source[]) {
  //   localStorage.setItem(LocalStorageTable.Source, JSON.stringify(sourceArray));
  // }

  
  
}
