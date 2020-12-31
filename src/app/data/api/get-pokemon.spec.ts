import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { serverError } from '../helpers/http.helper';
import { PageModel, PokemonModel } from '../models';
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
    spyOn(getPokemon, 'find').and.returnValues(
      new Observable((observer) => {
        observer.error(serverError());
        observer.complete();
      })
    );
    sut.find().subscribe(
      () => fail('expected an error, not pokemon'),
      (error: HttpErrorResponse) => expect(error.status).toBe(500)
    );
  });

  it('should receive data if API is ok', () => {
    const sut = getPokemon;
    const httpResponse: PageModel<PokemonModel> = {
      count: 1,
      next: 'valid_url',
      previous: 'valid_url',
      results: [
        {
          name: 'valid_name',
          url: 'detail_url',
        },
      ],
    };
    httpClientSpy.get.and.returnValue(of(httpResponse));
    sut.find().subscribe(
      (data: PageModel<PokemonModel>) => {
        expect(data).toEqual(httpResponse);
      },
      (error: HttpErrorResponse) => fail(error)
    );
  });
});
