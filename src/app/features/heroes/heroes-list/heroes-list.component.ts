import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ModalFormComponent, ModalService } from '../../../core';
import { HeroAddEditComponent } from '../hero-add-edit/hero-add-edit.component';
import { ChartData } from '../models/chart-data';
import { Hero } from '../models/hero.model';
import { ChartService } from '../services/chart/chart.service';
import { HeroService } from '../services/hero/hero.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnInit, OnDestroy {

  displayedColumns = ['nameLabel','genderLabel','citizenshipLabel','skillsLabel','occupationLabel','memberOfLabel','update', 'delete'];
  labelColumns = ['Name','Gender','Citizenship','Skills','Occupation','Member'];

  public dataSource = new MatTableDataSource<Hero>();
  selectedHero!: Hero;
  allHeroNames: string[] = [];
  chartData!: ChartData;

  subscriptions: Subscription[] = [];

  constructor(
    private heroService: HeroService,
    private modalService: ModalService,
    private chartService: ChartService
  ) {
  }

  ngOnInit(): void {
    this.getAllHeroes();
  }

  getAllHeroes() {
    this.subscriptions.push(this.heroService.getHeroes().subscribe(data => {
      this.dataSource.data = data;
      this.allHeroNames = data.map(elem => elem.nameLabel);
      this.chartData = this.chartService.getChartData(this.dataSource.data);
    }));
  }

  openHeroDetailDialog() {
    this.modalService.openDialog(ModalFormComponent, {
      data: this.selectedHero,
      height: '400px',
      width: '600px',
    });
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
    this.openHeroDetailDialog();
  }

  onFilterList(name: string) {
    const filteredtems = this.heroService.filter(name);
    this.dataSource.data = filteredtems;
  }

  onRemoveItem(name: string) {
    const filteredtems = this.heroService.removeFilter(name);
    this.dataSource.data = filteredtems;
  }

  onAddEditHero(data?: Hero) {
    let dialogOptions: {width: string, height: string, data?: Hero} = {
      height: '400px',
      width: '600px'
    };

    const mode = data ? 'edit' : 'add';

    if (data)
      dialogOptions.data = data;

    const dialogRef = this.modalService.openDialog(HeroAddEditComponent, dialogOptions);

    this.subscriptions.push(dialogRef.afterClosed().subscribe(returnedData => {
      if (returnedData) {
        if (mode === 'add') {
          this.heroService.add(returnedData);
          return;
        }
        this.heroService.update(returnedData);
      }
    }));
  }

  onDelete(hero: Hero) {
    this.heroService.remove(hero);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
