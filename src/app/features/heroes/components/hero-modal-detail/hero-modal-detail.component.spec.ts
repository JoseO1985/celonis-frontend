import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroModalDetailComponent } from './hero-modal-detail.component';

describe('HeroModalDetailComponent', () => {
  let component: HeroModalDetailComponent;
  let fixture: ComponentFixture<HeroModalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroModalDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroModalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
