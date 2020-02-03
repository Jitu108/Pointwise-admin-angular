import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SourceListRoutingModule } from './source-list-routing.module';
import { SourceListComponent } from './source-list.component';


@NgModule({
  declarations: [SourceListComponent],
  imports: [
    CommonModule,
    SourceListRoutingModule
  ]
})
export class SourceListModule { }
