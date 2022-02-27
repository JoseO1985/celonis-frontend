import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ModalFormComponent, ModalService } from '../../../core';
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
  subscription!: Subscription;
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
    this.subscription = this.heroesService.getHeroes().subscribe(data => {
      this.dataSource.data = data;
      this.allItems = data.map(elem => elem.nameLabel);
    });
  }

  openDialog() {
    this.modalService.openDialog(ModalFormComponent, this.selectedHero);
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
    this.openDialog();
  }

  onFilterList(name: string) {
    const filteredtems = this.heroesService.filter(name);
    this.dataSource.data = filteredtems;
  }

  onRemoveItem(name: string) {
    const filteredtems = this.heroesService.remove(name);
    this.dataSource.data = filteredtems;
  }

  onDelete($event: any) {

  }

  onUpdate($event: any) {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
