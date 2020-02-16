import { Tag } from './../../models/tag';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.scss']
})
export class TagFormComponent implements OnInit {

  public tagId: string;
  public tagDetail = <Tag>{}
  public mode: string;

  public Resources = {
    Header: "Tag",
    NameCaption: "Name",
    NamePlaceholder: "Name",
    SaveCaption: "Save",
    CancelCaption: "Cancel",
    Validation: {
      RequiredMessage: "Tag name is required."
    }
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    
    private router: Router,
    private tagService: TagService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        console.log(params);
        this.tagId = params['id'];

        //Edit
        if(this.tagId !== undefined){
          console.log(this.tagId);
          this.getTagDetailById(this.tagId);

          this.mode = "Edit";
        } else { // Add
          this.tagDetail['id'] = 0;
          this.mode = "Add";
        }
      });
  }

  getTagDetailById(id: string) {
    this.tagDetail = this.tagService.getTagById(parseInt(id));
  }

  // Submit
  onTagSubmit(form) {
    if(form.valid) {
      this.tagService.updateTag(this.tagDetail);
      this.router.navigate(['/tags']);
    }
  }
  
  // Cancel
  onCancelClick() {
    this.router.navigate(['/tags']);
  }
}

