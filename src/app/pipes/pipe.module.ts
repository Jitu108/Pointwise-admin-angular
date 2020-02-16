import { SummaryPipe } from './summary.pipe';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SummaryPipe],
  imports: [CommonModule],
  exports: [SummaryPipe]
})
export class PipeModule { 
  static forRoot(): ModuleWithProviders<PipeModule> {
    return {
        ngModule: PipeModule,
        providers: []
    };
}
}
