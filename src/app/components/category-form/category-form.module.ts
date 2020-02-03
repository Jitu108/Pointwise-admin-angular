import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryFormRoutingModule } from './category-form-routing.module';
import { CategoryFormComponent } from './category-form.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CategoryFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    CategoryFormRoutingModule
  ]
})
export class CategoryFormModule { }
