// tslint:disable
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { generator } from '../../../shared/utils/test-mocks';
import { HeroesListComponent } from './heroes-list.component';
import { HeroService } from '../services/hero/hero.service';
import { ModalService } from '../../../core';
import { ChartService } from '../services/chart/chart.service';
import { ChartType } from '../models/enums/chart';
import { of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


describe('HeroesListComponent', () => {
  let fixture: any;
  let component: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        HeroesListComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: HeroService, useValue: {
          getHeroes: jest.fn().mockImplementation(() => of(null)),
          add: jest.fn(),
          update: jest.fn(),
        } },
        { provide: ModalService, useFactory: generator.modalServiceStub() },
        { provide: ChartService, useFactory: generator.chartServiceStub() },
        { provide: ToastrService, useFactory: generator.toastrServiceStub() },
      ]
    }).overrideComponent(HeroesListComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(HeroesListComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  describe('getAllHeroes', () => {
    it ('should show a toast error message if an exception happens', () => {
      component.heroService.getHeroes = jest.fn().mockReturnValue(throwError('unhandled error'));
      component.getAllHeroes();

      expect(component.toastrService.error).toHaveBeenCalledWith('unhandled error');
    });

    it('should not initialize dataSource, heroes and chart data', async () => {
      component.getAllHeroes()

      expect(component.dataSource.data.length).toBe(0);
      expect(component.allHeroNames.length).toBe(0);
      expect(component.chartData).toBeUndefined();
    });

    it('should initialize dataSource, heroes and chart data', async () => {
      const mockHeroes = [{
        nameLabel: 'name',
        genderLabel: 'gender',
        citizenshipLabel: 'citizenship',
        skillsLabel: 'skills',
        occupationLabel: 'occupation',
        memberOfLabel: 'member',
        creatorLabel: 'creator'
      }];
      const mockChartData = {
        nameLabel: {
          type: ChartType.pie,
          data: [{value: 'Ahab', count: 1}]
        }
      }
      component.heroService.getHeroes = jest.fn().mockImplementation(() => of(mockHeroes));
      component.chartService.getChartData = jest.fn().mockImplementation(() => mockChartData);

      component.getAllHeroes()

      expect(component.dataSource.data).toBe(mockHeroes);
      expect(component.allHeroNames).toStrictEqual(['name']);
      expect(component.chartData).toBe(mockChartData);
    });
  });

  describe('onAddEditHero', () => {
    let returnedData: any;
    let addSpy!: jest.SpyInstance;
    let editSpy!: jest.SpyInstance;

    beforeEach(() => {
      returnedData = {nameLabel: 'name'};
      addSpy = jest.spyOn(component.heroService, 'add');
      editSpy = jest.spyOn(component.heroService, 'update');
      component.modalService.openDialog = jest.fn().mockImplementation(() => ({
        afterClosed: jest.fn(() => of(returnedData))
      }));
    })
    it('should open modal and after closed, call add hero', async () => {
      component.onAddEditHero();

      expect(addSpy).toHaveBeenCalledWith(returnedData);
      expect(editSpy).not.toHaveBeenCalledWith(returnedData);
    });

    it('should open modal and after closed, call edit hero', async () => {
      component.onAddEditHero({});

      expect(addSpy).not.toHaveBeenCalledWith(returnedData);
      expect(editSpy).toHaveBeenCalledWith(returnedData);
    });
    it('should open modal and if no data returned closed, no call to heroService is made', async () => {
      const returnedData = null;
      component.modalService.openDialog = jest.fn().mockImplementation(() => ({
        afterClosed: jest.fn(() => of(returnedData))
      }));

      component.onAddEditHero({});

      expect(addSpy).not.toHaveBeenCalledWith(returnedData);
      expect(editSpy).not.toHaveBeenCalledWith(returnedData);
    });
  });
});

