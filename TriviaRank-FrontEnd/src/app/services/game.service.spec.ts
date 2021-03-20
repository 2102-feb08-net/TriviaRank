import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(GameService);
  // });
  service = new GameService({} as HttpClient);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
