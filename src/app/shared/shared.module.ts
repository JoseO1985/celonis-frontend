import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChipAutocompleteComponent } from './components/chip-autocomplete/chip-autocomplete.component';
import { MaterialModule } from '../material.module';
import { PieComponent } from './components/pie/pie.component';
import { BarComponent } from './components/bar/bar.component';

@NgModule({
  imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule, FlexLayoutModule],
  exports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule, FlexLayoutModule,
    ChipAutocompleteComponent, PieComponent, BarComponent],
  declarations: [
    ChipAutocompleteComponent,
    PieComponent,
    BarComponent
  ],
})
export class SharedModule { }
