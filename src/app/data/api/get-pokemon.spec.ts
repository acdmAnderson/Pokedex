import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
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
    httpClientSpy.get.and.returnValue(of(errorResponse));
    sut.find().subscribe(
      (data: any) => fail('expected an error, not pokemon'),
      (error: HttpErrorResponse) =>
        expect(errorResponse.status).toBe(error.status)
    );
  });
});
