import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { LocalStorageService } from 'src/app/core';
import { environment } from '../../../../../environments/environment';
import { Hero } from '../../models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  storageKey = 'heroes';
  private heroes$: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);
  private heroes: Hero[] = [];
  private filters: string[] = [];

  constructor(
    public httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.loadData();
   }

  loadData() {
    const storageHeroes = this.localStorageService.getItem(this.storageKey);
    if (storageHeroes) {
      this.heroes = JSON.parse(storageHeroes);
      this.heroes$.next(this.heroes);
      return;
    }
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
    const foundedHero = this.heroes.find(item => item.nameLabel === hero.nameLabel);
    if (!foundedHero) {
      this.heroes.unshift(hero);
      this.updateStorage();
      this.heroes$.next(this.heroes);
    }
  }

  update(hero: Hero) {
    const heroToUpdateIndex = this.heroes.findIndex(item => item.nameLabel === hero.nameLabel);
    if (heroToUpdateIndex !== -1) {
      this.heroes[heroToUpdateIndex] = hero;
      this.updateStorage();
      this.heroes$.next(this.heroes);
    }
  }

  remove(hero: Hero) {
    this.heroes = this.heroes.filter(item => item.nameLabel !== hero.nameLabel);
    this.updateStorage();
    this.heroes$.next(this.heroes);
  }

  removeFilter(value: string) {
    const removeValue = value.toLowerCase();
    this.filters = this.filters.filter(filter => filter !== removeValue);
    const filteredHeroes = this.noFilters ?
      this.heroes :
      this.heroes.filter(hero => this.filters.includes(hero.nameLabel.toLowerCase()));

    return filteredHeroes;
  }

  updateStorage() {
    this.localStorageService.setItem('heroes', JSON.stringify(this.heroes));
  }
}
