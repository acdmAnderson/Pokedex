import { HttpErrorResponse } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { PokemonParams } from '../models';
import { GetPokemonService } from './get-pokemon.service';

describe('GetPokemonService', () => {
  const params: PokemonParams = {
    limit: 1,
    offset: 0,
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [GetPokemonService],
    }).compileComponents();
  }));

  it('should receive 500 if API have some error ', () => {
    const sut = TestBed.inject(GetPokemonService);
    sut.find(params).subscribe(
      () => fail('Expected a error not a pokemon'),
      (error: HttpErrorResponse) => expect(error.status).toBe(500)
    );
  });
});
