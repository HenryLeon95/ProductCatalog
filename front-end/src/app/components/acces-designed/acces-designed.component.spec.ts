import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesDesignedComponent } from './acces-designed.component';

describe('AccesDesignedComponent', () => {
  let component: AccesDesignedComponent;
  let fixture: ComponentFixture<AccesDesignedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccesDesignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
