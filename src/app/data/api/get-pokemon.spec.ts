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
    const params = {
      limit: 1,
      offset: 0,
    };
    sut.find(params).subscribe(
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
    const params = {
      limit: 1,
      offset: 0,
    };
    sut.find(params).subscribe(
      (data: PageModel<PokemonModel>) => {
        expect(data).toEqual(httpResponse);
      },
      (error: HttpErrorResponse) => fail(error)
    );
  });

  it('should call find with correct params', () => {
    const sut = getPokemon;
    const spyFind = spyOn(sut, 'find');
    const params = {
      limit: 1,
      offset: 0,
    };
    sut.find(params);
    expect(spyFind).toHaveBeenCalledWith({
      limit: 1,
      offset: 0,
    });
  });
});
