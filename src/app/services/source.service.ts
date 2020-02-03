import { LocalStorageTable } from './../enums/local-storage-table.enum';
import { Injectable } from '@angular/core';
import { Source } from '../models/source';

@Injectable({
  providedIn: 'root'
})
export class SourceService {
  
  public sources: Source[] = [];
  constructor() { }

  // Add Source
  addSource(source: Source) {
    var sourceArray = this.getLocalStorage();
    if(sourceArray != null) {
      var maxId = Math.max.apply(Math, sourceArray.map((o:Source) => {return o.id}));
      source.id = maxId + 1;
    }
    else {
      source.id = 1;
    }
    sourceArray.push(source);
    this.setLocalStorage(sourceArray);
  }

  // Update Source
  updateSource(source: Source) {
    console.log(source);
    if(source.id === 0) {
      this.addSource(source);
    }
    else {
      var sourceInStore = this.getSourceById(source.id);
      console.log(sourceInStore);
      if(sourceInStore === null) {
        source.id = 0;
        this.addSource(source);
      }
      else {
        sourceInStore.name = source.name;
        var sourceArray = this.getLocalStorage();
        for(var i in sourceArray) {
          if(sourceArray[i].id == source.id){
            sourceArray[i].name = source.name;
          }
        }
        this.setLocalStorage(sourceArray);
      }
    }
  }

  // Delete Source
  deleteSource(id: number) {
    var sourceArray = this.getLocalStorage();
    for(var i in sourceArray) {
      if(sourceArray[i].id === id) {
        sourceArray.splice(+i, 1);
        this.setLocalStorage(sourceArray);
      }
    }
  }

  // Get Source By Id
  getSourceById(id: number) : Source {
    var sourceArray = this.getLocalStorage();
    var source = sourceArray.filter(source => source.id === id).pop();
    return source;
  }

  // Get all Sources
  getSources() : Source[] {
    this.sources = this.getLocalStorage();

    if(this.sources === null || this.sources.length === 0){
      var dummySources = this.getDummySources();
      this.sources = dummySources;
      this.setLocalStorage(dummySources);
    }
    return this.sources;
  }

  // Search Sources
  getSourcesBySearchString(searchString: string){
    if(searchString === "") {
      return this.getSources();
    }
    var sources = this.getLocalStorage();
    var result: Source[] = new Array();

    for(var index = 0; index <sources.length; index++) {
      var entry = sources[index];
      if(entry && entry.name && entry.name.toUpperCase().indexOf(searchString.toUpperCase()) != -1) {
        result.push(entry);
      }
    }
    this.sources = result;
    return this.sources;
  }

  // Save dummy Sources
  getDummySources() : Source[] {
    var dummySources = [
      new Source(1, 'Press Information Bureau'),
      new Source(2, 'The Hindu'),
      new Source(3, 'The Indian Express')
    ];

    return dummySources;
  }

  // Get Local Storage
  getLocalStorage(): Source[] {
    return JSON.parse(localStorage.getItem(LocalStorageTable.Source));
  }

  // Reset Local Storage
  setLocalStorage(sourceArray: Source[]) {
    localStorage.setItem(LocalStorageTable.Source, JSON.stringify(sourceArray));
  }

  
  
}
