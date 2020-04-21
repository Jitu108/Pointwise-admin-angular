import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatRippleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatIconModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  providers: [MatDatepickerModule],
  exports:[
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatRippleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatIconModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatTooltipModule,
    MatSnackBarModule
  ]
})
export class MatComponentsModule { }
