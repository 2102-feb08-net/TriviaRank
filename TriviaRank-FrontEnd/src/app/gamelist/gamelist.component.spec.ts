import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamelistComponent } from './gamelist.component';

describe('GamelistComponent', () => {
  let component: GamelistComponent;
  let fixture: ComponentFixture<GamelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('formatedDate', () => {
  it('should return a date as a string', () => {

    let testDate : Date;
    testDate = new Date();
    const result = GamelistComponent.prototype.formattedDate(testDate);
    expect(result).toBe(testDate.toLocaleString());
  });
});
