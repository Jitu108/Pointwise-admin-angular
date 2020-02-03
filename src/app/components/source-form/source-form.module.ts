import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SourceFormRoutingModule } from './source-form-routing.module';
import { SourceFormComponent } from './source-form.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SourceFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    SourceFormRoutingModule
  ]
})
export class SourceFormModule { }
