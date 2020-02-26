import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith, concatAll, withLatestFrom} from 'rxjs/operators';

@Component({
  selector: 'dropdown',
  templateUrl: './drop-down-list.component.html',
  styleUrls: ['./drop-down-list.component.scss']
})
export class DropDownListComponent implements OnInit {

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

      this.items.pipe(
        withLatestFrom(this.selectedValue),
        map(([itemList, value]) => {
          var selectedItem = itemList.find(x => x.id == value);
          if((selectedItem !== undefined))
          this.myControl.setValue(selectedItem.name);
        })
      ).subscribe();

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      ).pipe(concatAll());
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
    // var value = event.target.value !== "" ? this.items.find(x => x.name == event.target.value) : null;
    // this.change.emit(value);

  }

  optionSelected(eventValue)
  {
    debugger;
    if(eventValue == "") this.change.emit(null);
    else {
      this.items.pipe(
        map(itemList => {
          var value = itemList.find(x => x.name == eventValue);
          debugger;
          this.change.emit(value);
        })
      ).subscribe();
    }


    // var value = eventValue !== "" ? this.items.find(x => x.name == eventValue) : null;  
    // this.change.emit(value);
  }
}

export class DropDownModel {
  id: string;
  name: string;
}
