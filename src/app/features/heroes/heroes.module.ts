import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesComponent } from './heroes.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { HeroModalDetailComponent } from './components/hero-modal-detail/hero-modal-detail.component';


@NgModule({
  declarations: [
    HeroesComponent,
    HeroesListComponent,
    HeroModalDetailComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    SharedModule
  ]
})
export class HeroesModule { }
