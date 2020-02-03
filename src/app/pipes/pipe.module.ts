import { SummaryPipe } from './summary.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [SummaryPipe],
  imports: [CommonModule],
  exports: [SummaryPipe]
})
export class PipeModule { 
  static forRoot(){
    return {
      ngModule: PipeModule,
      providers: []
    }
  }
}
