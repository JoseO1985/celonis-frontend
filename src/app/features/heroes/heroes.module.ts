import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesComponent } from './heroes.component';
import { SharedModule } from '../../shared/shared.module';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { HeroAddComponent } from './hero-add/hero-add.component';
import { BarComponent } from './components/bar/bar.component';
import { PieComponent } from './components/pie/pie.component';
import { HeroTableComponent } from './components/hero-table/hero-table.component';


@NgModule({
  declarations: [
    HeroesComponent,
    HeroesListComponent,
    HeroAddComponent,
    BarComponent,
    PieComponent,
    HeroTableComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    SharedModule
  ]
})
export class HeroesModule { }
