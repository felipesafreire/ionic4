import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioSemanalHorizontalComponent } from './calendario-semanal-horizontal.component';

describe('CalendarioSemanalHorizontalComponent', () => {
  let component: CalendarioSemanalHorizontalComponent;
  let fixture: ComponentFixture<CalendarioSemanalHorizontalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarioSemanalHorizontalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioSemanalHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
