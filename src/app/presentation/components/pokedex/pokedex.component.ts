import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { GetPokemonService } from 'src/app/data/services/get-pokemon.service';
import { Pagination, Pokemon, PokemonParams } from 'src/app/domain/models';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
})
export class PokedexComponent implements OnInit, OnDestroy {
  private readonly LIMIT = 20;
  private readonly OFFSET = 20;
  private unsubscribeAll: Subject<any>;

  @Input() pokemonName: string;
  pokemonParams: PokemonParams;
  page: number;
  pageSize: number;
  pokedex: Array<Pokemon>;
  isLoading = false;
  constructor(private readonly getPokemonService: GetPokemonService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.pokemonParams = {
      limit: this.LIMIT,
      offset: this.OFFSET,
    };
    this.isLoading = true;
    this.getPokemons()
      .pipe(
        takeUntil(this.unsubscribeAll),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((paginationPokemon) => {
        const { page, pageSize, results } = paginationPokemon;
        this.page = page;
        this.pageSize = pageSize;
        this.pokedex = results;
        console.log(results);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  getPokemons(): Observable<Pagination<Pokemon>> {
    return this.getPokemonService.find(this.pokemonParams);
  }

  getPokemonsByName(): Observable<Pagination<Pokemon>> {
    return new Observable((observer) => {
      observer.next({
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
      });
      observer.complete();
    });
  }
}
