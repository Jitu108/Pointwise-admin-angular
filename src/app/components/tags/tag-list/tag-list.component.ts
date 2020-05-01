import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag';
import { EntityType, AccessType } from 'src/app/common/enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenMatSnackBar } from 'src/app/common/mat-items';
import { AuthService } from 'src/app/services/auth.service';

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
    SoftDeleteMessage: "Source deleted successfully.",
    UndoSoftDeleteCaption: "Undo Soft Delete",
    UndoSoftDeleteMessage: "Source deletion undone.",
    DeleteCaption: "Delete",
    DeleteMessage: "Source deleted permanently.",
    TableHeaders: {
      SlColumn: "#",
      NameColumn: "Name",
      DeletedColumn: "IsDeleted?",
      ActionColumn: "Action"
    }
  }

  public tags$: Observable<Tag[]>;
  public isEditable: boolean = false;
  public isSoftDeletable: boolean = false;
  public isUndoSoftDeletable: boolean = false;
  public isDeletable: boolean = false;

  constructor(
      private router: Router, 
      private tagService: TagService,
      private snackBar: MatSnackBar,
      public authService: AuthService) { }

  ngOnInit() {
    this.isEditable = this.authService.hasRight(EntityType.Tag, AccessType.Update);
    this.isSoftDeletable = this.authService.hasRight(EntityType.Tag, AccessType.SoftDelete);
    this.isUndoSoftDeletable = this.authService.hasRight(EntityType.Tag, AccessType.UndoSoftDelete);
    this.isDeletable = this.authService.hasRight(EntityType.Tag, AccessType.Delete);
    this.getTags();
  }

  // Load all Tags
  getTags() {
    this.tags$ = this.tagService.getTags();
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
    this.tagService.softDelete(id)
    .subscribe(x => {
        this.getTags();
        OpenMatSnackBar(this.snackBar, this.Resources.SoftDeleteMessage);
    });
  }

  // Undo Soft Delete Tag
  undoSoftDeleteTag(id: number) {
    this.tagService.undoSoftDelete(id)
    .subscribe(x => {
        this.getTags();
        OpenMatSnackBar(this.snackBar, this.Resources.UndoSoftDeleteMessage);
    });
  }

  // Delete Tag
  deleteTag(id: number) {
    this.tagService.delete(id)
    .subscribe(x => {
        this.getTags();
        OpenMatSnackBar(this.snackBar, this.Resources.DeleteMessage);
    });
  }

  searchTag(searchString: string) {
    this.tags$ = this.tagService.getAllBySearchString(searchString);
  }
}
