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
  itemsArray: string[];

  @Input("label") label;
  @Input("selected-items") selectedItems: string[];
  @Input("list") items: string[];
  @Output("selection-change") change = new EventEmitter();

  @ViewChild('chipInput') chipInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {}

  ngOnInit() {
    this.itemsArray = Object.assign([], this.items);

    this.items.sort();
    if(this.selectedItems === undefined) this.selectedItems = [];

    this.filteredItems = this.chipCtrl.valueChanges.pipe(
      startWith(null),
      map((item: string | null) => item ? this._filter(item) : this.items))
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add item
    if ((value || '').trim()) {
      if(this.itemsArray.indexOf(value) >= 0 ) {
        this.selectedItems.push(value.trim());
      }
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

        if(this.itemsArray.indexOf(item) >= 0) {
          this.items.push(item);
        }
        this.items.sort();
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    var item = event.option.viewValue;
    this.selectedItems.push(item);
    if(this.chipInput !== undefined)
    this.chipInput.nativeElement.value = '';
    this.chipCtrl.setValue(null);

    const index = this.items.indexOf(item);

    if (index >= 0) {
      this.items.splice(index, 1);
    }

    this.items.sort();

    this.change.emit(this.selectedItems);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.items.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
  }

}
