import { HttpErrorResponse } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { notFound } from '../helpers/http.helper';
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

  it('should receive 500 if API have something error ', () => {
    const sut = TestBed.inject(GetPokemonService);
    sut.find(params).subscribe(
      () => fail('Expected a error not a pokemon'),
      (error: HttpErrorResponse) => expect(error.status).toBe(500)
    );
  });

  it('should receive 404 if API returns not found', () => {
    const sut = TestBed.inject(GetPokemonService);
    spyOn(sut, 'find').and.returnValues(
      new Observable((observer) => {
        observer.error(notFound());
        observer.complete();
      })
    );
    sut.find(params).subscribe(
      () => fail('Expected a error not a pokemon'),
      (error: HttpErrorResponse) => expect(error.status).toBe(404)
    );
  });
});
