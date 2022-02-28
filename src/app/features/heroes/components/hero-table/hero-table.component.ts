import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChartData } from '../../models/chart-data';
import { ChartType } from '../../models/enums/chart';
import { Hero } from '../../models/hero.model';

@Component({
  selector: 'app-hero-table',
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.scss']
})
export class HeroTableComponent implements OnInit {

  displayedColumns = ['nameLabel','genderLabel','citizenshipLabel','skillsLabel','occupationLabel','memberOfLabel','update', 'delete'];
  labelColumns = ['Name','Gender','Citizenship','Skills','Occupation','Member'];

  @Input() title!: string;
  @Input() dataSource = new MatTableDataSource<Hero>();
  @Input() chartData!: ChartData;
  @Output() select: EventEmitter<Hero> = new EventEmitter();
  @Output() delete: EventEmitter<Hero> = new EventEmitter();
  @Output() update: EventEmitter<Hero> = new EventEmitter();

  @ViewChild(MatSort) sort!: MatSort;

  ChartType = ChartType;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onSelect(hero: Hero) {
    this.select.emit(hero);
  }

  onDelete(hero: Hero) {
    this.delete.emit(hero);
  }

  onUpdate(hero: Hero) {
    this.update.emit(hero);
  }

}
