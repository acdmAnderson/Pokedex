import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { GetPokemonService } from 'src/app/data/services/get-pokemon.service';
import { Pagination, Pokemon } from 'src/app/domain/models';
import { GetPokemonUseCase } from 'src/app/domain/usecases/get-pokemon';
import { PokedexComponent } from './pokedex.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('PokedexComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [PokedexComponent],
      providers: [
        { provide: GetPokemonService, useValue: makeGetPokemonSut() },
      ],
    }).compileComponents();
    TestBed.inject(HttpClient);
  }));

  const makeGetPokemonSut = (): GetPokemonUseCase => {
    class GetPokemonStub extends GetPokemonUseCase {
      constructor() {
        super();
      }
      find(): Observable<Pagination<Pokemon>> {
        return new Observable((observer) => {
          const fakePaginationPokemon: Pagination<Pokemon> = {
            count: 1,
            pageSize: 1,
            page: 0,
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
    return new PokedexComponent(getPokemonStub as any);
  };

  it('should receive error if GetPokemonService have something error', () => {
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

  it('should return data if GetPokemonService is ok', () => {
    const sut = makePokemonComponentSut();
    const validData: Pagination<Pokemon> = {
      count: 1,
      pageSize: 1,
      page: 0,
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
    sut.find().subscribe((data) => expect(data).toEqual(validData));
  });

  it('should create the Pokedex', () => {
    const fixture = TestBed.createComponent(PokedexComponent);
    const pokedex = fixture.componentInstance;
    expect(pokedex).toBeTruthy();
  });
});
