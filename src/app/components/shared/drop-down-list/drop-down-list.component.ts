//import { DropDownModel } from './../../../models/drop-down-model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dropdown',
  templateUrl: './drop-down-list.component.html',
  styleUrls: ['./drop-down-list.component.scss']
})
export class DropDownListComponent implements OnInit {

  @Input("list") items: DropDownModel[];
  @Input("select-caption") selectCaption: string = "Select";
  @Input("selected-id") selectedValue: string;
  @Output("selection-change") change = new EventEmitter();

  constructor() { }

  ngOnInit() {
    var test = this.items;
  }

  selectionchanged() {
    var value = 
      this.selectedValue !== ""
        ? this.items.find(x => x.id == this.selectedValue)
        : null;

    this.change.emit(value);
  }
}

export class DropDownModel {
  id: string;
  name: string;
}
