import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable, Subject} from 'rxjs';
import {map, startWith, merge} from 'rxjs/operators';

@Component({
  selector: 'chipset',
  templateUrl: './chipset.component.html',
  styleUrls: ['./chipset.component.scss']
})
export class ChipsetComponent implements OnInit{

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  chipCtrl = new FormControl();
  filteredItems: Observable<string[]>;

  @Input("label") label;//: string = "Select Fruit";
  @Input("selected-items") selectedItems: string[];// = ['Lemon'];
  @Input("list") items: string[];// = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  @Output("selection-change") change = new EventEmitter();

  @ViewChild('chipInput') chipInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {
    
  }

  ngOnInit() {
    debugger;
    console.log(this.items);

    if(this.selectedItems === undefined) this.selectedItems = [];

    this.filteredItems = this.chipCtrl.valueChanges.pipe(
      startWith(null),
      map((item: string | null) => item ? this._filter(item) : this.items.slice()))
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.selectedItems.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.chipCtrl.setValue(null);
  }

  remove(item: string): void {
    const index = this.selectedItems.indexOf(item);

    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    debugger;
    this.selectedItems.push(event.option.viewValue);
    if(this.chipInput !== undefined)
    this.chipInput.nativeElement.value = '';
    this.chipCtrl.setValue(null);

    const index = this.items.indexOf(event.option.viewValue);

    if (index >= 0) {
      this.items.splice(index, 1);
    }


    this.change.emit(this.selectedItems);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.items.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
  }

}
