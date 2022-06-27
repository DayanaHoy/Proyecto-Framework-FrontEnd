import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDashBoardComponent } from './personal-dash-board.component';

describe('PersonalDashBoardComponent', () => {
  let component: PersonalDashBoardComponent;
  let fixture: ComponentFixture<PersonalDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalDashBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
