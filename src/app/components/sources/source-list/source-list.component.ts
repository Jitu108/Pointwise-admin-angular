import { Component, OnInit } from '@angular/core';
import { Source } from 'src/app/models/source';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SourceService } from 'src/app/services/source.service';

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
    UndoSoftDeleteCaption: "Undo Soft Delete",
    DeleteCaption: "Delete",
    TableHeaders: {
      SlColumn: "#",
      NameColumn: "Name",
      DeletedColumn: "IsDeleted?",
      ActionColumn: "Action"
    }
  }

  public sources$: Observable<Source[]>;
  search: string;
  constructor(private router: Router, private sourceService: SourceService) { }

  ngOnInit() {
    this.getSources();
  }

  // Load all Sources
  getSources() {
    this.sources$ = this.sourceService.getAllSources();
    return this.sources$;
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
    this.sourceService.softDelete(id);
  }

  // Undo Soft Delete Source
  undoSoftDeleteSource(id: number) {
    this.sourceService.undoSoftDelete(id);
  }

  // Delete Source
  deleteSource(id: number) {
    this.sourceService.delete(id);
  }

  searchSource(searchString: string) {
    this.sources$ = this.sourceService.getAllBySearchString(searchString);
  }

}
