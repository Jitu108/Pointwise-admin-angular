import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagFormRoutingModule } from './tag-form-routing.module';
import { TagFormComponent } from './tag-form.component';


@NgModule({
  declarations: [TagFormComponent],
  imports: [
    CommonModule,
    TagFormRoutingModule
  ]
})
export class TagFormModule { }
