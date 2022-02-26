import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../models/hero.model';
import { HeroesService } from '../services/heroes.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnInit {
  heroes$: Observable<Hero[]> = of([]);
  displayedColumns = ['nameLabel', 'genderLabel', 'citizenshipLabel', 'skillsLabel', 'occupationLabel', 'memberOfLabel', 'memberOfLabel'];

  constructor(
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    this.heroes$ = this.heroesService.getAll();
  }

  onSelect($event: any) {

  }

  onRemove($event: any) {

  }

}
