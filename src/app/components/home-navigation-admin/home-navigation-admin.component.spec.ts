import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNavigationAdminComponent } from './home-navigation-admin.component';

describe('HomeNavigationAdminComponent', () => {
  let component: HomeNavigationAdminComponent;
  let fixture: ComponentFixture<HomeNavigationAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeNavigationAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeNavigationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
