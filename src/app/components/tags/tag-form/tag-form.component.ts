import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TagService } from 'src/app/services/tag.service';
import { Observable } from 'rxjs';
import { isNumeric } from 'src/app/common/util';
import { Tag } from 'src/app/models/tag';

@Component({
    selector: 'app-tag-form',
    templateUrl: './tag-form.component.html',
    styleUrls: ['./tag-form.component.scss']
})
export class TagFormComponent implements OnInit {

    public tagId: number;
    public tagDetail$: Observable<Tag>;
    public mode: string;

    @ViewChild('nameInput', { read: ElementRef }) private nameInput: ElementRef;

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
                if (isNumeric(params['id'])) {
                    this.tagId = parseInt(params['id']);
                }

                //Edit
                if (this.tagId !== undefined) {
                    this.getTagDetailById(this.tagId);

                    this.mode = "Edit";
                } else { // Add
                    this.mode = "Add";
                }
            });
    }

    getTagDetailById(id: number) {
        this.tagDetail$ = this.tagService.getById(id);
    }

    // Submit
    onTagSubmit(form) {
        if (form.valid) {
            this.tagId = this.tagId === undefined ? 0 : this.tagId;

            var tag = {
                id: this.tagId,
                name: this.nameInput.nativeElement.value,
            } as Tag;

            this.tagService.save(this.tagId, tag)
                .subscribe(x => {
                    this.router.navigate(['/tags']);
                });
        }
    }

    // Cancel
    onCancelClick() {
        this.router.navigate(['/tags']);
    }
}

