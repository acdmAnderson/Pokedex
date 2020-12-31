import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { notFound, serverError } from '../helpers/http.helper';
import { GetPokemonDetail } from './get-pokemon-detail';

describe('GetPokemonDetail', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let getPokemonDetail: GetPokemonDetail;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    getPokemonDetail = new GetPokemonDetail(httpClientSpy as any);
  });

  it('should receive 500 if API have something error', () => {
    const sut = getPokemonDetail;
    spyOn(sut, 'find').and.returnValues(
      new Observable((observer) => {
        observer.error(serverError());
        observer.complete();
      })
    );
    const valid_url = 'https://valid_url.com';
    sut.find(valid_url).subscribe(
      () => fail('expected an error, not pokemon'),
      (error: HttpErrorResponse) => expect(error.status).toBe(500)
    );
  });

  it('should receive 404 if API returns not found', () => {
    const sut = getPokemonDetail;
    spyOn(sut, 'find').and.returnValues(
      new Observable((observer) => {
        observer.error(notFound());
        observer.complete();
      })
    );
    const invalid_url = 'https://invalid_url.com';
    sut.find(invalid_url).subscribe(
      () => fail('expected an error, not pokemon'),
      (error: HttpErrorResponse) => expect(error.status).toBe(404)
    );
  });

  //   it('should receive data if API is ok', () => {
  //     const sut = getPokemon;
  //     const httpResponse: PokemonDetailModel = {
  //           id: 1,
  //           abilities: [
  //             {
  //               name: 'valid_ability',
  //             },
  //           ],
  //           height: 10,
  //           weight: 10,
  //           name: 'valid_name',
  //           types: [
  //             {
  //               name: 'valid_type',
  //             },
  //           ],
  //     };
  //     httpClientSpy.get.and.returnValue(of(httpResponse));
  //     sut.find().subscribe(
  //       (data: PageModel<PokemonModel>) => {
  //         expect(data).toEqual(httpResponse);
  //       },
  //       (error: HttpErrorResponse) => fail(error)
  //     );
  //   });
});
