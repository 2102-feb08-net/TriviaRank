import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendinvitesComponent } from './friendinvites.component';

describe('FriendinvitesComponent', () => {
  let component: FriendinvitesComponent;
  let fixture: ComponentFixture<FriendinvitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendinvitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendinvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
