import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagination, Pokemon } from 'src/app/domain/models';
import { GetPokemon } from 'src/app/domain/usecases/get-pokemon';
import { PokedexComponent } from './pokedex.component';

describe('PokedexComponent', () => {
  const makeGetPokemonSut = (): GetPokemon => {
    class GetPokemonStub implements GetPokemon {
      find(): Observable<Pagination<Pokemon>> {
        return new Observable((observer) => {
          const fakePaginationPokemon: Pagination<Pokemon> = {
            count: 1,
            next: 1,
            previous: 0,
            results: [
              {
                id: 1,
                height: 'valid_height',
                weight: 'valid_height',
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
          observer.next(fakePaginationPokemon);
          observer.complete();
        });
      }
    }
    return new GetPokemonStub();
  };

  const makePokemonComponentSut = (): PokedexComponent => {
    const getPokemonStub = makeGetPokemonSut();
    return new PokedexComponent(getPokemonStub);
  };

  it('should return error if GetPokemon have something error', () => {
    const sut = makePokemonComponentSut();
    spyOn(sut, 'find').and.returnValues(
      new Observable((observer) => {
        observer.error(
          new HttpErrorResponse({
            status: 500,
            statusText: 'Internal server error',
          })
        );
      })
    );
    sut.find().subscribe(
      () => fail('Expected a error not a pokemon'),
      (error: HttpErrorResponse) => expect(error.status).toBe(500)
    );
  });
});
