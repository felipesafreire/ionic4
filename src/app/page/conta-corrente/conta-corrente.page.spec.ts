import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaCorrentePage } from './conta-corrente.page';

describe('ContaCorrentePage', () => {
  let component: ContaCorrentePage;
  let fixture: ComponentFixture<ContaCorrentePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContaCorrentePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaCorrentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
