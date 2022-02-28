import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Hero } from '../../models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroes$: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);
  private heroes: Hero[] = [];
  private filters: string[] = [];

  constructor(
    public httpClient: HttpClient
  ) {
    this.loadData();
   }

  loadData() {
    return this.httpClient.get<Hero[]>(environment.jsonUrl)
      .pipe(
        take(1),
        map(heroes => {
          this.heroes = heroes;
          this.heroes$.next(this.heroes);
        })
      ).toPromise();
  }

  getHeroes() {
    return this.heroes$.asObservable();
  }

  filter(value: string) {
    const filterValue = value.toLowerCase();
    this.filters.push(filterValue);
    const filteredHeroes = this.heroes.filter(hero => this.filters.includes(hero.nameLabel.toLowerCase()));

    return filteredHeroes;
  }

  get noFilters() {
    return this.filters.length === 0;
  }

  add(hero: Hero) {
    this.heroes.unshift(hero);
    this.heroes$.next(this.heroes);
  }

  remove(value: string) {
    const removeValue = value.toLowerCase();
    this.filters = this.filters.filter(filter => filter !== removeValue);
    const filteredHeroes = this.noFilters ?
      this.heroes :
      this.heroes.filter(hero => this.filters.includes(hero.nameLabel.toLowerCase()));

    return filteredHeroes;
  }
}
