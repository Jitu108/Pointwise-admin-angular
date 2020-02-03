import { SourceService } from './../../services/source.service';
import { Component, OnInit } from '@angular/core';
import { Source } from 'src/app/models/source';
import { Router } from '@angular/router';

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
    DeleteCaption: "Delete",
    TableHeaders: {
      SlColumn: "#",
      NameColumn: "Name",
      ActionColumn: "Action"
    }
  }

  public sources: Source[] = [];
  search: string;
  constructor(private router: Router, private sourceService: SourceService) { }

  ngOnInit() {
    this.getSources();
  }

  // Load all Sources
  getSources() {
    console.log("getSources Called - Component");
    this.sources = this.sourceService.getSources();
    console.log(this.sources);
    return this.sources;
  }

  // Add Source
  addSource() {
    this.router.navigate(['/source-detail']);
    console.log("Add Source");
  }

  // Edit Source
  editSource(id: number) {
    console.log("Edit Source : " + id);
    this.router.navigate(['/source-detail'], {queryParams: {id: id}});
  }

  // Delete Source
  deleteSource(id: number) {
    this.sourceService.deleteSource(id);
    this.getSources();
  }

  searchSource(searchString: string) {
    this.sources = this.sourceService.getSourcesBySearchString(searchString);
    console.log(searchString);
  }

}
