import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Page, PokemonModel } from '../models';
import { GetPokemon } from './get-pokemon';

describe('GetPokemon', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let getPokemon: GetPokemon;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    getPokemon = new GetPokemon(httpClientSpy as any);
  });

  it('should receive 500 if API have something error', () => {
    const sut = getPokemon;
    const errorResponse = new HttpErrorResponse({
      status: 500,
      statusText: 'Internal server error',
    });
    spyOn(getPokemon, 'find').and.returnValues(
      new Observable((observer) => {
        observer.error(errorResponse);
        observer.complete();
      })
    );
    sut.find().subscribe(
      () => fail('expected an error, not pokemon'),
      (error: HttpErrorResponse) =>
        expect(errorResponse.status).toBe(error.status)
    );
  });

  it('should receive data if API is ok', () => {
    const sut = getPokemon;
    const httpResponse: Page<PokemonModel> = {
      count: 1,
      next: 'valid_url',
      previous: 'valid_url',
      results: [
        {
          id: 1,
          abilities: [
            {
              name: 'valid_ability',
            },
          ],
          height: 10,
          weight: 10,
          name: 'valid_name',
          types: [
            {
              name: 'valid_type',
            },
          ],
        },
      ],
    };
    httpClientSpy.get.and.returnValue(of(httpResponse));
    sut.find().subscribe(
      (data: Page<PokemonModel>) => {
        expect(data).toEqual(httpResponse);
      },
      (error: HttpErrorResponse) => fail(error)
    );
  });
});
