import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Source } from 'src/app/models/source';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { isNumeric } from 'src/app/common/util';
import { SourceService } from 'src/app/services/source.service';

@Component({
  selector: 'app-source-form',
  templateUrl: './source-form.component.html',
  styleUrls: ['./source-form.component.scss']
})
export class SourceFormComponent implements OnInit {

  public sourceId: number;
  public sourceDetail$: Observable<Source>
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
        if(isNumeric(params['id']))
        {
          this.sourceId = parseInt(params['id']);

        }

        //Edit
        if(this.sourceId !== undefined){
          this.getSourceDetailById(this.sourceId);

          this.mode = "Edit";
        } else { // Add
          this.mode = "Add";
        }
      });
  }

  getSourceDetailById(id: number) {
    this.sourceDetail$ = this.sourceService.getById(id);
  }

  // Submit
  onSourceSubmit(form) {
    if(form.valid) {
      this.sourceId = this.sourceId === undefined? 0: this.sourceId;
      this.sourceService.save(this.sourceId,  new Source(this.sourceId, form.value.Name, false));
      this.router.navigate(['/sources']);
    }
  }
  
  // Cancel
  onCancelClick() {
    this.router.navigate(['/sources']);
  }
}
