import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Hero } from '../models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(
    public httpClient: HttpClient
  ) { }

  getAll() {
    return this.httpClient.get<Hero[]>(environment.jsonUrl);
  }
}
