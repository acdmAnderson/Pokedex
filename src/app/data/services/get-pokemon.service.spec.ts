import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon } from 'src/app/domain/models';
import { GetPokemon } from '../api/get-pokemon';
import { GetPokemonDetail } from '../api/get-pokemon-detail';
import { notFound, serverError } from '../helpers/http.helper';
import {
  PageModel,
  PokemonDetailModel,
  PokemonModel,
  PokemonParams,
} from '../models';
import { GetPokemonService } from './get-pokemon.service';

describe('GetPokemonService', () => {
  const params: PokemonParams = {
    limit: 1,
    offset: 0,
  };

  interface SutSetup {
    sut: GetPokemonService;
    getPokemonStub: GetPokemon;
    getPokemonDetailStub: GetPokemonDetail;
  }

  const makePokemonStub = (): GetPokemon => {
    class GetPokemonStub extends GetPokemon {
      constructor() {
        super(Inject(HttpClient));
      }
      find(pokemonParams: PokemonParams): Observable<PageModel<PokemonModel>> {
        return new Observable((observer) => {
          observer.next({
            count: 1,
            next: 'valid_url',
            previous: 'valid_url',
            results: [
              {
                name: 'valid_name',
                url: 'detail_url',
              },
            ],
          });
        });
      }
    }
    return new GetPokemonStub();
  };

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
    const getPokemonStub = makePokemonStub();
    const getPokemonDetailStub = makePokemonDetailStub();
    const sut = new GetPokemonService(getPokemonStub, getPokemonDetailStub);
    return {
      sut,
      getPokemonDetailStub,
      getPokemonStub,
    };
  };

  it('should receive 500 if API have something error ', () => {
    const { sut } = makeSut();
    spyOn(sut, 'find').and.returnValues(
      new Observable((observer) => {
        observer.error(serverError());
        observer.complete();
      })
    );
    sut.find(params).subscribe(
      () => fail('Expected a error not a pokemon'),
      (error: HttpErrorResponse) => expect(error.status).toBe(500)
    );
  });

  it('should receive 404 if API returns not found', () => {
    const { sut } = makeSut();
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

  it('should receive data if API returns ok', (done: DoneFn) => {
    const { sut } = makeSut();
    const serviceResponse: Array<Pokemon> = [
      {
        id: 1,
        height: '10 dm',
        weight: '10 hg',
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
      },
    ];
    spyOn(sut, 'find').and.returnValue(of(serviceResponse));
    sut.find(params).subscribe((data) => {
      expect(data).toEqual(serviceResponse);
      done();
    });
  });

  it('should be called with correct params', () => {
    const { sut } = makeSut();
    const spyFind = spyOn(sut, 'find');
    sut.find(params);
    expect(spyFind).toHaveBeenCalledWith({
      limit: 1,
      offset: 0,
    });
  });

  it('should return error if PokemonDetails throws', (done: DoneFn) => {
    const { sut, getPokemonDetailStub } = makeSut();
    spyOn(getPokemonDetailStub, 'find').and.throwError(
      new Error('Internal Server Error')
    );
    sut.find(params).subscribe(
      () => fail('expect a error not a pokemon'),
      (error: Error) => {
        expect(error.message).toBe('Internal Server Error');
        done();
      }
    );
  });
});
