import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GetPokemonDetail } from '../api/get-pokemon-detail';
import { serverError } from '../helpers/http.helper';
import { PokemonDetailModel } from '../models';
import { GetPokemonByNameService } from './get-pokemon-by-name.service';

describe('GetPokemonByNameService', () => {
  interface SutSetup {
    sut: GetPokemonByNameService;
    getPokemonDetailStub: GetPokemonDetail;
  }

  const makePokemonDetailStub = (): GetPokemonDetail => {
    class GetPokemonDetailStub extends GetPokemonDetail {
      constructor() {
        super(Inject(HttpClient));
      }
      find(url: string): Observable<PokemonDetailModel> {
        return new Observable((observer) => {
          observer.next({
            id: 1,
            height: 10,
            weight: 10,
            name: 'valid_name',
            abilities: [
              {
                name: 'valid_ability',
              },
            ],
            types: [
              {
                name: 'valid_type',
              },
            ],
          });
        });
      }
    }
    return new GetPokemonDetailStub();
  };

  const makeSut = (): SutSetup => {
    const getPokemonDetailStub = makePokemonDetailStub();
    const sut = new GetPokemonByNameService(getPokemonDetailStub);
    return {
      sut,
      getPokemonDetailStub,
    };
  };

  it('should receive 500 if API have something error ', () => {
    const { sut } = makeSut();
    const pokemonName = 'name_searched';
    sut.findByName(pokemonName).subscribe(
      () => fail('Expected a error not a pokemon'),
      (error: HttpErrorResponse) => expect(error.status).toBe(500)
    );
  });
});
