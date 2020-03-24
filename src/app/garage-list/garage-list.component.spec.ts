import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageListComponent } from './garage-list.component';

describe('GaragesListComponent', () => {
  let component: GarageListComponent;
  let fixture: ComponentFixture<GarageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GarageListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
