import { TestBed } from '@angular/core/testing';

import { PlaybuddyproxyService } from './playbuddyproxy.service';

describe('PlaybuddyproxyService', () => {
  let service: PlaybuddyproxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaybuddyproxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
