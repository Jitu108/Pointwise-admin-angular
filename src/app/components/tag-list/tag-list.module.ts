import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagListRoutingModule } from './tag-list-routing.module';
import { TagListComponent } from './tag-list.component';


@NgModule({
  declarations: [TagListComponent],
  imports: [
    CommonModule,
    TagListRoutingModule
  ]
})
export class TagListModule { }
