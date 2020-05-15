import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag';
import { EntityType, AccessType } from 'src/app/common/enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenMatSnackBar } from 'src/app/common/mat-items';
import { AuthService } from 'src/app/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
    SoftDeleteMessage: "Tag deleted successfully.",
    UndoSoftDeleteCaption: "Undo Soft Delete",
    UndoSoftDeleteMessage: "Tag deletion undone.",
    DeleteCaption: "Delete",
    DeleteMessage: "Tag deleted permanently.",
    TableHeaders: {
      SlColumn: "#",
      IdColumn: "Id",
      NameColumn: "Name",
      DeletedColumn: "IsDeleted?",
      ActionColumn: "Action"
    }
  }

  public tags$: Observable<Tag[]>;
  public isCreatable: boolean = false;
  public isEditable: boolean = false;
  public isSoftDeletable: boolean = false;
  public isUndoSoftDeletable: boolean = false;
  public isDeletable: boolean = false;

  displayedColumns: string[] = ['id', 'name', 'isDeleted', 'action'];
  dataSource = new MatTableDataSource<Tag>();
  selection = new SelectionModel<Tag>(false);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
      private router: Router, 
      private tagService: TagService,
      private snackBar: MatSnackBar,
      public authService: AuthService) { }

  ngOnInit() {
    this.isCreatable = this.authService.hasRight(EntityType.Tag, AccessType.Add);
    this.isEditable = this.authService.hasRight(EntityType.Tag, AccessType.Update);
    this.isSoftDeletable = this.authService.hasRight(EntityType.Tag, AccessType.SoftDelete);
    this.isUndoSoftDeletable = this.authService.hasRight(EntityType.Tag, AccessType.UndoSoftDelete);
    this.isDeletable = this.authService.hasRight(EntityType.Tag, AccessType.Delete);
    this.getTags();
  }

  // Load all Tags
  getTags() {
    this.tags$ = this.tagService.getTags();
    this.tags$.subscribe(x => {
        this.dataSource.data = x;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
