import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedFriendsListComponent } from './accepted-friends-list.component';

describe('AcceptedFriendsListComponent', () => {
  let component: AcceptedFriendsListComponent;
  let fixture: ComponentFixture<AcceptedFriendsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptedFriendsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedFriendsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
