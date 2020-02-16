import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  public categoryId: string;
  public categoryDetail = <Category>{}
  public mode: string;

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
        console.log(params);
        this.categoryId = params['id'];

        //Edit
        if(this.categoryId !== undefined){
          console.log(this.categoryId);
          this.getCategoryDetailById(this.categoryId);

          this.mode = "Edit";
        } else { // Add
          this.categoryDetail['id'] = 0;
          this.mode = "Add";
        }
      });
  }

  getCategoryDetailById(id: string) {
    this.categoryDetail = this.categoryService.getCategoryById(parseInt(id));
  }

  // Submit
  onCategorySubmit(form) {
    if(form.valid) {
      this.categoryService.updateCategory(this.categoryDetail);
      this.router.navigate(['/categories']);
    }
  }
  
  // Cancel
  onCancelClick() {
    this.router.navigate(['/categories']);
  }
}
