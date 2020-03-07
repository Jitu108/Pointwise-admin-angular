import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith, concatAll, withLatestFrom} from 'rxjs/operators';

@Component({
  selector: 'dropdown',
  templateUrl: './drop-down-list.component.html',
  styleUrls: ['./drop-down-list.component.scss']
})
export class DropDownListComponent implements OnInit, OnChanges {

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  @Input("list") items: Observable<DropDownModel[]>;
  @Input("select-caption") selectCaption: string = "Select";
  @Input("selected-id") selectedValue: Observable<string>;
  @Input("label") label: string;
  @Input("id") id: string;
  @Input("name") name: string;
  @Output("selection-change") change = new EventEmitter();


  constructor() { }

  ngOnInit() {

      this.items.subscribe();

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      ).pipe(concatAll());
  }

  ngOnChanges() {
      if(this.items !== undefined && this.selectedValue !== undefined) {
    this.items
      .pipe(
        withLatestFrom(this.selectedValue),
        map(([itemList, value]) => {
          var selectedItem = itemList.find(x => x.id == value);
          if((selectedItem !== undefined))
          this.myControl.setValue(selectedItem.name);
        }),
      )
      .subscribe();
    }
  }

  private _filter(value: string): Observable<string[]> {
    const filterValue = value.toLowerCase();

    return this.items.pipe(
      map(itemList => {
        return itemList.map(item => item.name).filter(option => option.toLowerCase().includes(filterValue))
      })
    );
  }

  selectionchanged(event) {
    var value = event.target.value;
    if(value == "") this.change.emit(null);
    else {
      this.items.pipe(
        map(itemList => {
          var val = itemList.find(x => x.name == event.target.value);
          this.change.emit(val);
        })
      ).subscribe();
    }

  }

  optionSelected(eventValue)
  {
    if(eventValue == "") this.change.emit(null);
    else {
      this.items.pipe(
        map(itemList => {
          var value = itemList.find(x => x.name == eventValue);
          this.change.emit(value);
        })
      ).subscribe();
    }

  }
}

export class DropDownModel {
  id: string;
  name: string;
}
