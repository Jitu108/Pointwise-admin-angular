import { Tag } from './../models/tag';
import { Injectable } from '@angular/core';
import { LocalStorageTable } from '../enums/local-storage-table.enum';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  public tags: Tag[] = [];

  constructor() { }

  // Add Tag
  addTag(tag: Tag) {
    var tagArray = this.getLocalStorage();
    if(tagArray != null) {
      var maxId = Math.max.apply(Math, tagArray.map((o:Tag) => {return o.id}));
      tag.id = maxId + 1;
    }
    else {
      tag.id = 1;
    }
    tagArray.push(tag);
    this.setLocalStorage(tagArray);
  }

  // Update Tag
  updateTag(tag: Tag) {
    console.log(tag);
    if(tag.id === 0) {
      this.addTag(tag);
    }
    else {
      var tagInStore = this.getTagById(tag.id);
      console.log(tagInStore);
      if(tagInStore === null) {
        tag.id = 0;
        this.addTag(tag);
      }
      else {
        tagInStore.name = tag.name;
        var tagArray = this.getLocalStorage();
        for(var i in tagArray) {
          if(tagArray[i].id == tag.id){
            tagArray[i].name = tag.name;
          }
        }
        this.setLocalStorage(tagArray);
      }
    }
  }

  // Delete Tag
  deleteTag(id: number) {
    var tagArray = this.getLocalStorage();
    for(var i in tagArray) {
      if(tagArray[i].id === id) {
        tagArray.splice(+i, 1);
        this.setLocalStorage(tagArray);
      }
    }
  }

  // Get Tag by Id
  getTagById(id: number): Tag {
    var tagArray = this.getLocalStorage();
    var tag = tagArray.filter(tag => tag.id === id).pop();
    return tag;
  }

  // Get all Tags
  getTags(): Tag[] {
    this.tags = this.getLocalStorage();

    if(this.tags === null || this.tags.length === 0){
      var dummyTags = this.getDummyTags();
      this.tags = dummyTags;
      this.setLocalStorage(dummyTags);
    }
    return this.tags;
  }

  // Search Tags
  getTagsBySearchString(searchString: string) {
    if(searchString === "") {
      return this.getTags();
    }
    var categories = this.getLocalStorage();
    var result: Tag[] = new Array();

    for(var index = 0; index <categories.length; index++) {
      var entry = categories[index];
      if(entry && entry.name && entry.name.toUpperCase().indexOf(searchString.toUpperCase()) != -1) {
        result.push(entry);
      }
    }
    this.tags = result;
    return this.tags;
  }

  // Save dummy Tags
  getDummyTags(): Tag[] {
    var dummyTags = [
      new Tag(1, 'WHO'),
      new Tag(2, 'Virus'),
      new Tag(3, 'Disease'),
      new Tag(4, 'Vaccination'),
      new Tag(5, 'Epidemic'),
      new Tag(6, 'Outbreak')

    ];

    return dummyTags;
  }

    // Get Local Storage
    getLocalStorage(): Tag[] {
      return JSON.parse(localStorage.getItem(LocalStorageTable.Tag));
    }
  
    // Reset Local Storage
    setLocalStorage(tagArray: Tag[]) {
      localStorage.setItem(LocalStorageTable.Tag, JSON.stringify(tagArray));
    }
  
}
