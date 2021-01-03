import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pagination, Pokemon } from 'src/app/domain/models';
import { GetPokemonDetail } from '../api/get-pokemon-detail';
import { notFound, serverError } from '../helpers/http.helper';
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
    spyOn(sut, 'findByName').and.returnValues(
      new Observable((observer) => {
        observer.error(serverError());
        observer.complete();
      })
    );
    const pokemonName = 'name_searched';
    sut.findByName(pokemonName).subscribe(
      () => fail('Expected a error not a pokemon'),
      (error: HttpErrorResponse) => expect(error.status).toBe(500)
    );
  });

  it('should receive 404 if API not found pokemon searched', () => {
    const { sut } = makeSut();
    spyOn(sut, 'findByName').and.returnValues(
      new Observable((observer) => {
        observer.error(notFound());
        observer.complete();
      })
    );
    const pokemonName = 'name_searched';
    sut.findByName(pokemonName).subscribe(
      () => fail('Expected a error not a pokemon'),
      (error: HttpErrorResponse) => expect(error.status).toBe(404)
    );
  });

  it('should receive data if API returns ok', (done: DoneFn) => {
    const { sut } = makeSut();
    const pokemonName = 'name_searched';
    const serviceResponse: Pagination<Pokemon> = {
      count: 1,
      pageSize: 1,
      page: 0,
      results: [
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
      ],
    };
    sut.findByName(pokemonName).subscribe((data) => {
      expect(data).toEqual(serviceResponse);
      done();
    });
  });

  it('should be called with correct name', () => {
    const { sut } = makeSut();
    const pokemonName = 'name_searched';
    const spyFind = spyOn(sut, 'findByName');
    sut.findByName(pokemonName);
    expect(spyFind).toHaveBeenCalledWith('name_searched');
  });
});
