import { Tag } from './../../models/tag';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {
  public Resources = {
    Header: "Tags",
    SearchPlaceholder:"Search",
    AddToolTip: "Add Tag",
    AddCaption: "Tag",
    EditCaption: "Edit",
    DeleteCaption: "Delete",
    TableHeaders: {
      SlColumn: "#",
      NameColumn: "Name",
      ActionColumn: "Action"
    }
  }

  public tags: Tag[] = [];
  search: string;
  constructor(private router: Router, private tagService: TagService) { }

  ngOnInit() {
    this.getTags();
  }

  // Load all Tags
  getTags() {
    console.log("getTags Called - Component");
    this.tags = this.tagService.getTags();
    console.log(this.tags);
    return this.tags;
  }

  // Add Tag
  addTag() {
    this.router.navigate(['/tags/detail']);
    console.log("Add Tag");
  }

  // Edit Tag
  editTag(id: number) {
    console.log("Edit Tag : " + id);
    this.router.navigate(['/tags/detail'], {queryParams: {id: id}});
  }

  // Delete Tag
  deleteTag(id: number) {
    this.tagService.deleteTag(id);
    this.getTags();
  }

  searchTag(searchString: string) {
    this.tags = this.tagService.getTagsBySearchString(searchString);
    console.log(searchString);
  }

}
