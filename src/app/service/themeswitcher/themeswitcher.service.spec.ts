import { TestBed } from '@angular/core/testing';

import { ThemeswitcherService } from './themeswitcher.service';

describe('ThemeswitcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThemeswitcherService = TestBed.get(ThemeswitcherService);
    expect(service).toBeTruthy();
  });
});
