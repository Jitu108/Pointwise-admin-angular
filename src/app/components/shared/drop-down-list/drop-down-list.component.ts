import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'dropdown',
  templateUrl: './drop-down-list.component.html',
  styleUrls: ['./drop-down-list.component.scss']
})
export class DropDownListComponent implements OnInit {

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  @Input("list") items: DropDownModel[];
  @Input("select-caption") selectCaption: string = "Select";
  @Input("selected-id") selectedValue: string;
  @Input("label") label: string;
  @Input("id") id: string;
  @Input("name") name: string;
  @Output("selection-change") change = new EventEmitter();


  constructor() { }

  ngOnInit() {
    var selectedItem = this.items.find(x => x.id == this.selectedValue);
    var selectedText = selectedItem !== undefined ? selectedItem.name : "";

    this.myControl.setValue(selectedText);

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.items.map(x => x.name).filter(option => option.toLowerCase().includes(filterValue));
  }

  selectionchanged(event) {
    var value = event.target.value !== "" ? this.items.find(x => x.name == event.target.value) : null;
    this.change.emit(value);
  }

  optionSelected(eventValue)
  {
    var value = eventValue !== "" ? this.items.find(x => x.name == eventValue) : null;  
    this.change.emit(value);
  }
}

export class DropDownModel {
  id: string;
  name: string;
}
