import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CidadePage } from './cidade.page';

describe('CidadePage', () => {
  let component: CidadePage;
  let fixture: ComponentFixture<CidadePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CidadePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
