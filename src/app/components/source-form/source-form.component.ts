import { SourceService } from './../../services/source.service';
import { Component, OnInit } from '@angular/core';
import { Source } from 'src/app/models/source';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-source-form',
  templateUrl: './source-form.component.html',
  styleUrls: ['./source-form.component.scss']
})
export class SourceFormComponent implements OnInit {

  public sourceId: string;
  public sourceDetail = <Source>{}
  public mode: string;

  public Resources = {
    Header: "Source",
    NameCaption: "Name",
    NamePlaceholder: "Name",
    SaveCaption: "Save",
    CancelCaption: "Cancel",
    Validation: {
      RequiredMessage: "Source name is required."
    }
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sourceService: SourceService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        console.log(params);
        this.sourceId = params['id'];

        //Edit
        if(this.sourceId !== undefined){
          console.log(this.sourceId);
          this.getSourceDetailById(this.sourceId);

          this.mode = "Edit";
        } else { // Add
          this.sourceDetail['id'] = 0;
          this.mode = "Add";
        }
      });
  }

  getSourceDetailById(id: string) {
    this.sourceDetail = this.sourceService.getSourceById(parseInt(id));
  }

  // Submit
  onSourceSubmit(form) {
    if(form.valid) {
      this.sourceService.updateSource(this.sourceDetail);
      this.router.navigate(['/sources']);
    }
  }
  
  // Cancel
  onCancelClick() {
    this.router.navigate(['/sources']);
  }
}
