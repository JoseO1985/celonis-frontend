import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, of, startWith, Subscription } from 'rxjs';
import { Hero } from '../models/hero.model';
import { HeroesService } from '../services/heroes.service';
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ModalDetailComponent } from '../components/modal-detail/modal-detail.component';

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
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getAllHeroes();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getAllHeroes() {
    this.subscription = this.heroesService.getAll().subscribe(data => {
      this.dataSource.data = data;
      this.allItems = data.map(elem => elem.nameLabel);
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.selectedHero;
    this.dialog.open(ModalDetailComponent, dialogConfig);
}

  onSelect(hero: Hero) {
    this.selectedHero = hero;
    this.openDialog();
  }

  onDelete($event: any) {

  }

  onUpdate($event: any) {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
