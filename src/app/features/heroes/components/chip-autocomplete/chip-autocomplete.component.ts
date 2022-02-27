import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, of, startWith } from 'rxjs';

@Component({
  selector: 'app-chip-autocomplete',
  templateUrl: './chip-autocomplete.component.html',
  styleUrls: ['./chip-autocomplete.component.scss']
})
export class ChipAutocompleteComponent implements OnInit {

  itemCtrl = new FormControl();
  filteredItems: Observable<string[]> = of([]);
  @Input() allItems: string[] = [];
  items: string[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('itemInput') itemInput!: ElementRef<HTMLInputElement>;

  constructor() { }

  ngOnInit(): void {
    this.watchFilter();
  }

  addChip(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      const filterList = this.getUniqueList(this.allItems);
      const index = filterList.indexOf(event.value);
      if (index > -1) {
        this.items.push(event.value);
      }
    }

    if (input) {
      input.value = "";
    }

    this.itemCtrl.setValue(null);
  }

  onRemoveChip(item: string) {
    const index = this.items.indexOf(item);
    if (index >= 0) {
      this.items.splice(index, 1);
    }

    this.itemCtrl.updateValueAndValidity();
  }

  onSelectAutocomplete($event: MatAutocompleteSelectedEvent): void {
    this.items.push($event.option.viewValue);
    this.itemInput.nativeElement.value = '';
    this.itemCtrl.setValue(null);
  }

  watchFilter() {
    this.filteredItems = this.itemCtrl.valueChanges.pipe(
      startWith(null),
      map((value: string | null) => {
        return (value ?
          this.getUniqueList(this._filter(value)) :
          this.getUniqueList(this.allItems.slice()))
      }
    ))
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allItems.filter(item => item.toLowerCase().includes(filterValue));
  }

  getUniqueList(itemsList: string[]) {
    return itemsList.filter(itemA => this.items.indexOf(itemA) === -1);
  }

}