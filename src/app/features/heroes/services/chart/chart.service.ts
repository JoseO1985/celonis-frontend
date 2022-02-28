import { Injectable } from '@angular/core';
import { ChartColumn, ChartData, ChartDataMap } from '../../models/chart-data';
import { ChartType } from '../../models/enums/chart';
import { Hero } from '../../models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  getChartData(heroes: Hero[]) {
    const data: ChartDataMap = {};

    heroes.forEach((hero: Hero) => {
      const entries = Object.entries(hero);

      for (let entry of entries) {

        const column = entry[0];
        const value = entry[1];

        if (!data[column]) {
          data[column] = {
            [value]: {
              value: value,
              count: 1
            }
          }
          continue;
        }

        if (!data[column][value]) {
          data[column][value] = {
            value,
            count: 1
          }
          continue;
        }

        data[column][value].count++;
      }
    });
    return this.formatChartData(data) as any;
  }

  formatChartData(data: ChartDataMap) {
    const map: any = {};
    Object.keys(data).forEach(key => {
      const values = Object.values(data[key]);
      map[key] = {
        type: values.length < 6 ? ChartType.pie : ChartType.bar,
        data: values
      }
    })
    return map;
  }
}
