import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesComponent } from './heroes.component';
import { SharedModule } from '../../shared/shared.module';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { HeroAddEditComponent } from './hero-add-edit/hero-add-edit.component';
import { HeroTableComponent } from './components/hero-table/hero-table.component';


@NgModule({
  declarations: [
    HeroesComponent,
    HeroesListComponent,
    HeroAddEditComponent,
    HeroTableComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    SharedModule
  ]
})
export class HeroesModule { }
