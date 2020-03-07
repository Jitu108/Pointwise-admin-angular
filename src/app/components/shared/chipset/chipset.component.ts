import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, ElementRef, ViewChild, Input, Output, EventEmitter, OnInit, OnChanges } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent, MatAutocomplete } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { Observable, of } from "rxjs";
import { map, startWith, mergeMap, debounceTime } from "rxjs/operators";

@Component({
  selector: "chipset",
  templateUrl: "./chipset.component.html",
  styleUrls: ["./chipset.component.scss"]
})
export class ChipsetComponent implements OnInit, OnChanges {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  chipCtrl = new FormControl();
  filteredItems$: Observable<string[]>;
  itemsArray: string[];
  tempItems$: Observable<string[]>;

  @Input("label") label: string;
  @Input("selected-items") selectedItems$: Observable<string[]>;
  @Input("list") items$: Observable<string[]>;
  @Output("selection-change") change = new EventEmitter();

  @ViewChild("chipInput") chipInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  constructor() {}

  ngOnInit() {
    this.tempItems$ = this.items$.pipe(map(items => items.sort()));

    this.tempItems$.subscribe(items => {
      items.sort();
      this.itemsArray = Object.assign([], items);
    });


    this.filteredItems$ = this.chipCtrl.valueChanges
    .pipe(
      startWith(''),
      mergeMap(
        (item: string | null) => 
        {
            if(item) {
            var fv = this._filter(item);
            return fv;
            }
            else {
              return this.tempItems$;
            }
        }
      )
    );

   }

   ngOnChanges() {
       if(this.selectedItems$ !== undefined) {
       this.selectedItems$.subscribe
       (items => {
           debugger;
               // Remove item from filteredItems$
                this.filteredItems$ = this.filteredItems$.pipe(
                    map(arrItems => {
                    for(var item of items) {
                        var index = arrItems.indexOf(item);
                
                        if (index >= 0) {
                            arrItems.splice(index, 1);
                        }
                    }
                    arrItems.sort();
                    return arrItems;
                    })
                );
       });
    }
   }

   private _filter(value: string): Observable<string[]> {
    if(value === null) value = '';
    const filterValue = value.toLowerCase();

    let filtredItems = 
    this.itemsArray.filter(item => {
        let status = item.toLowerCase().includes(filterValue);
        return status;
    });
    return of(filtredItems);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add item
    if ((value || "").trim()) {
      if (this.itemsArray.indexOf(value) >= 0) {
        this.selectedItems$ = 
        this.selectedItems$.pipe(
          map(arrItems => {
            if(arrItems.indexOf(value.trim()) == -1) {
              arrItems.push(value.trim());
            }
            return arrItems;
          })
        );
      }
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }

    this.chipCtrl.setValue(null);
    this.selectedItems$.subscribe(items => this.change.emit(items));
  }

  inputchanged($event) {

  }

  remove(item: string): void {
    // Remove from selectedItems$
    this.selectedItems$ = 
    this.selectedItems$.pipe(
      map(arrItems => {
        var index = arrItems.indexOf(item);
        if (index >= 0) {
          arrItems.splice(index, 1);
        }

        return arrItems;
      })
    );
      
    // Add to filteredItems$
    this.filteredItems$ = 
    this.filteredItems$.pipe(
      map(arrItems => {
        if(arrItems.indexOf(item) == -1) {
          arrItems.push(item);
          arrItems.sort();
        }
        return arrItems;
      })
    );
    
    this.filteredItems$.subscribe(console.log);

    // Subscribe to selectedItems and emit changes to component parent
    this.selectedItems$.subscribe(items => this.change.emit(items));
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    var item = event.option.viewValue;

    // Remove item from filteredItems$
    this.filteredItems$ = this.filteredItems$.pipe(
      map(arrItems => {
        var index = arrItems.indexOf(item);

        if (index >= 0) {
          arrItems.splice(index, 1);
        }
        arrItems.sort();
        return arrItems;
      })
    );

    // Add item to selectedItems$
    this.selectedItems$ = this.selectedItems$.pipe(
      map(arrItems => {
        if(arrItems.indexOf(item) == -1){
          arrItems.push(item);
        }
        return arrItems;
      })
    );

    if (this.chipInput !== undefined) this.chipInput.nativeElement.value = "";
    this.chipCtrl.setValue(null);

    // Subscribe to selectedItems and emit changes to component parent
    this.selectedItems$.subscribe(items => this.change.emit(items));
    }
}
