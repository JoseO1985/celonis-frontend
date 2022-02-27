import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesComponent } from './heroes.component';
import { SharedModule } from '../../shared/shared.module';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { HeroAddComponent } from './hero-add/hero-add.component';


@NgModule({
  declarations: [
    HeroesComponent,
    HeroesListComponent,
    HeroAddComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    SharedModule
  ]
})
export class HeroesModule { }
