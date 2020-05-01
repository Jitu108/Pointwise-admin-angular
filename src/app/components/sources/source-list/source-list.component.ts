import { Component, OnInit } from '@angular/core';
import { Source } from 'src/app/models/source';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SourceService } from 'src/app/services/source.service';
import { EntityType, AccessType } from 'src/app/common/enum';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenMatSnackBar } from 'src/app/common/mat-items';

@Component({
  selector: 'app-source-list',
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.scss']
})
export class SourceListComponent implements OnInit {
  public Resources = {
    Header: "Sources",
    SearchPlaceholder:"Search",
    AddToolTip: "Add Source",
    AddCaption: "Source",
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

  public sources$: Observable<Source[]>;
  public isEditable: boolean = false;
  public isSoftDeletable: boolean = false;
  public isUndoSoftDeletable: boolean = false;
  public isDeletable: boolean = false;

  constructor(
      private router: Router, 
      private sourceService: SourceService,
      private snackBar: MatSnackBar,
      public authService: AuthService) { }

  ngOnInit() {
    this.isEditable = this.authService.hasRight(EntityType.Source, AccessType.Update);
    this.isSoftDeletable = this.authService.hasRight(EntityType.Source, AccessType.SoftDelete);
    this.isUndoSoftDeletable = this.authService.hasRight(EntityType.Source, AccessType.UndoSoftDelete);
    this.isDeletable = this.authService.hasRight(EntityType.Source, AccessType.Delete);
    this.getSources();
  }

  // Load all Sources
  getSources() {
    this.sources$ = this.sourceService.getSources();
  }

  // Add Source
  addSource() {
    this.router.navigate(['/sources/detail']);
  }

  // Edit Source
  editSource(id: number) {
    this.router.navigate(['/sources/detail'], {queryParams: {id: id}});
  }

  // Soft Delete Source
  softDeleteSource(id: number) {
    this.sourceService.softDelete(id)
    .subscribe(x => {
        this.getSources();
        OpenMatSnackBar(this.snackBar, this.Resources.SoftDeleteMessage);
    });
  }

  // Undo Soft Delete Source
  undoSoftDeleteSource(id: number) {
    this.sourceService.undoSoftDelete(id)
    .subscribe(x => {
        this.getSources();
        OpenMatSnackBar(this.snackBar, this.Resources.UndoSoftDeleteMessage);
    });
  }

  // Delete Source
  deleteSource(id: number) {
    this.sourceService.delete(id)
    .subscribe(x => {
        this.getSources();
        OpenMatSnackBar(this.snackBar, this.Resources.DeleteMessage);
    });
  }

  searchSource(searchString: string) {
    this.sources$ = this.sourceService.getAllBySearchString(searchString);
  }
}
