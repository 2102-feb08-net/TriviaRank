import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewfriendinfoComponent } from './newfriendinfo.component';

describe('NewfriendinfoComponent', () => {
  let component: NewfriendinfoComponent;
  let fixture: ComponentFixture<NewfriendinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewfriendinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewfriendinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
