import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { HeroModalDetailComponent } from '../components/hero-modal-detail/hero-modal-detail.component';
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

  constructor(
    private heroesService: HeroesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllHeroes();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getAllHeroes() {
    this.subscription = this.heroesService.getAll().subscribe(data => this.dataSource.data = data)
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.selectedHero;
    this.dialog.open(HeroModalDetailComponent, dialogConfig);
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
