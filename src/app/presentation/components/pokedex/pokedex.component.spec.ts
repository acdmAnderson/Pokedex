import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { GetPokemonService } from 'src/app/data/services/get-pokemon.service';
import { Pagination, Pokemon } from 'src/app/domain/models';
import { GetPokemonUseCase } from 'src/app/domain/usecases/get-pokemon';
import { PokedexComponent } from './pokedex.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GetPokemonByNameUseCase } from 'src/app/domain/usecases/get-pokemon-by-name';
import { GetPokemonByNameService } from 'src/app/data/services/get-pokemon-by-name.service';
import {
  FaIconComponent,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';

describe('PokedexComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [PokedexComponent, FaIconComponent],
      providers: [
        { provide: GetPokemonService, useValue: makeGetPokemonSut() },
        {
          provide: GetPokemonByNameService,
          useValue: makeGetPokemonByNameSut(),
        },
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
                weight: 'valid_weight',
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

  const makeGetPokemonByNameSut = (): GetPokemonByNameUseCase => {
    class GetPokemonByNameStub extends GetPokemonByNameUseCase {
      constructor() {
        super();
      }
      findByName(pokemonName: string): Observable<Pagination<Pokemon>> {
        return new Observable((observer) => {
          const fakePaginationPokemon: Pagination<Pokemon> = {
            count: 1,
            pageSize: 1,
            page: 0,
            results: [
              {
                id: 1,
                height: 'valid_height',
                weight: 'valid_weight',
                name: 'name_searched',
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
    return new GetPokemonByNameStub();
  };

  const makeServerError = (): HttpErrorResponse => {
    return new HttpErrorResponse({
      status: 500,
      statusText: 'Internal server error',
    });
  };

  it('should receive 500 if GetPokemonService have something error', () => {
    const sut = makeSut();
    spyOn(sut, 'getPokemons').and.returnValues(
      new Observable((observer) => {
        observer.error(new HttpErrorResponse(makeServerError()));
      })
    );
    sut.getPokemons().subscribe(
      () => fail('Expected a error not a pokemon'),
      (error: HttpErrorResponse) => expect(error.status).toBe(500)
    );
  });

  it('should return append data if GetPokemonService is ok', (done: DoneFn) => {
    const sut = makeSut();
    sut.ngOnInit();
    sut.appendPokemons();
    setInterval(() => {
      expect(sut.pokedex.length).toBe(2);
      done();
    }, 200);
  });

  it('should return data if GetPokemonService is ok', () => {
    const sut = makeSut();
    const validData: Pagination<Pokemon> = {
      count: 1,
      pageSize: 1,
      page: 0,
      results: [
        {
          id: 1,
          height: 'valid_height',
          weight: 'valid_weight',
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
    sut.getPokemons().subscribe((data) => expect(data).toEqual(validData));
  });

  const makeSut = (): PokedexComponent => {
    const fixture = TestBed.createComponent(PokedexComponent);
    return fixture.componentInstance;
  };

  it('should create the Pokedex', () => {
    const pokedex = makeSut();
    expect(pokedex).toBeTruthy();
  });

  it('should search pokemon by name', () => {
    const sut = makeSut();
    const expectedPokemonName = 'name_searched';
    sut.pokemonName = expectedPokemonName;
    sut.getPokemonsByName().subscribe((data) => {
      const havePokemon = data.results.some(
        (pokemon) => pokemon.name === expectedPokemonName
      );
      expect(havePokemon).toBe(true);
    });
  });

  it('should receive 500 if GetPokemonByNameService have something error', () => {
    const sut = makeSut();
    spyOn(sut, 'getPokemonsByName').and.returnValues(
      new Observable((observer) => {
        observer.error(new HttpErrorResponse(makeServerError()));
      })
    );
    sut.getPokemonsByName().subscribe(
      () => fail('Expected a error not a pokemon'),
      (error: HttpErrorResponse) => expect(error.status).toBe(500)
    );
  });

  const makeNotFoundError = (): HttpErrorResponse => {
    return new HttpErrorResponse({
      status: 404,
      statusText: 'Not found',
    });
  };

  it('should receive 404 if GetPokemonByNameService have something error', () => {
    const sut = makeSut();
    spyOn(sut, 'getPokemonsByName').and.returnValues(
      new Observable((observer) => {
        observer.error(new HttpErrorResponse(makeNotFoundError()));
      })
    );
    sut.getPokemonsByName().subscribe(
      () => fail('Expected a error not a pokemon'),
      (error: HttpErrorResponse) => expect(error.status).toBe(404)
    );
  });
});
