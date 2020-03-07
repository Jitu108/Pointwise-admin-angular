import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag';

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
    SoftDeleteCaption: "Soft Delete",
    UndoSoftDeleteCaption: "Undo Soft Delete",
    DeleteCaption: "Delete",
    TableHeaders: {
      SlColumn: "#",
      NameColumn: "Name",
      DeletedColumn: "IsDeleted?",
      ActionColumn: "Action"
    }
  }

  public tags$: Observable<Tag[]>;
  search: string;
  constructor(private router: Router, private tagService: TagService) { }

  ngOnInit() {
    this.getTags();
  }

  // Load all Tags
  getTags() {
    this.tags$ = this.tagService.getAllTags();
    return this.tags$;
  }

  // Add Tag
  addTag() {
    this.router.navigate(['/tags/detail']);
  }

  // Edit Tag
  editTag(id: number) {
    this.router.navigate(['/tags/detail'], {queryParams: {id: id}});
  }

  // Soft Delete Tag
  softDeleteTag(id: number) {
    this.tagService.softDelete(id);
  }

  // Undo Soft Delete Tag
  undoSoftDeleteTag(id: number) {
    this.tagService.undoSoftDelete(id);
  }

  // Delete Tag
  deleteTag(id: number) {
    this.tagService.delete(id);
  }

  searchTag(searchString: string) {
    this.tags$ = this.tagService.getAllBySearchString(searchString);
  }

}
