import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ModalFormComponent, ModalService } from '../../../core';
import { HeroAddComponent } from '../hero-add/hero-add.component';
import { Hero } from '../models/hero.model';
import { HeroesService } from '../services/heroes.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnInit, OnDestroy {
  displayedColumns = ['nameLabel', 'genderLabel', 'citizenshipLabel', 'skillsLabel', 'occupationLabel', 'memberOfLabel', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Hero>();
  @ViewChild(MatSort) sort!: MatSort;
  selectedHero!: Hero;
  subscriptions: Subscription[] = [];
  allItems: string[] = [];

  constructor(
    private heroesService: HeroesService,
    private modalService: ModalService
  ) {
  }

  ngOnInit(): void {
    this.getAllHeroes();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getAllHeroes() {
    this.subscriptions.push(this.heroesService.getHeroes().subscribe(data => {
      this.dataSource.data = data;
      this.allItems = data.map(elem => elem.nameLabel);
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
    const filteredtems = this.heroesService.filter(name);
    this.dataSource.data = filteredtems;
  }

  onRemoveItem(name: string) {
    const filteredtems = this.heroesService.remove(name);
    this.dataSource.data = filteredtems;
  }

  onAddHero() {
    const dialogRef = this.modalService.openDialog(HeroAddComponent,
    {
      height: '400px',
      width: '600px',
    });

    this.subscriptions.push(dialogRef.afterClosed().subscribe(returnedData => {
      this.heroesService.add(returnedData);
    }));
  }

  onDelete($event: any) {

  }

  onUpdate($event: any) {

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
