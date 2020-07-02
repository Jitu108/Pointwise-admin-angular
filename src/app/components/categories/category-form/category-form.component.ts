import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Category } from 'src/app/models/category';
import { isNumeric } from 'src/app/common/util';

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

    public categoryId: number;
    public categoryDetail$: Observable<Category>;
    public mode: string;

    @ViewChild('nameInput', { read: ElementRef }) private nameInput: ElementRef;

    public Resources = {
        Header: "Category",
        NameCaption: "Name",
        NamePlaceholder: "Name",
        SaveCaption: "Save",
        CancelCaption: "Cancel",
        Validation: {
            RequiredMessage: "Category name is required."
        }
    }

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private categoryService: CategoryService
    ) { }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(
            (params: Params) => {
                if (isNumeric(params['id'])) {
                    this.categoryId = parseInt(params['id']);
                }

                //Edit
                if (this.categoryId !== undefined) {
                    this.getCategoryDetailById(this.categoryId);

                    this.mode = "Edit";
                } else { // Add
                    this.mode = "Add";
                }
            });
    }

    getCategoryDetailById(id: number) {
        this.categoryDetail$ = this.categoryService.getById(id);
    }

    // Submit
    onCategorySubmit(form) {
        if (form.valid) {
            this.categoryId = this.categoryId === undefined ? 0 : this.categoryId;

            var category = {
                id: this.categoryId,
                name: this.nameInput.nativeElement.value,
            } as Category;
            
            this.categoryService.save(this.categoryId, category)
                .subscribe(x => {
                    this.router.navigate(['/categories']);
                });
        }
    }

    // Cancel
    onCancelClick() {
        this.router.navigate(['/categories']);
    }
}
