import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroAddEditComponent } from './hero-add-edit.component';

describe('HeroAddEditComponent', () => {
  let component: HeroAddEditComponent;
  let fixture: ComponentFixture<HeroAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
