import { Component, OnDestroy, OnInit } from '@angular/core';
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

  pokemonParams: PokemonParams;
  page: number;
  pageSize: number;
  pokedex: Array<Pokemon>;
  constructor(private readonly getPokemonService: GetPokemonService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.pokemonParams = {
      limit: this.LIMIT,
      offset: this.OFFSET,
    };
    this.getPokemons()
      .pipe(
        takeUntil(this.unsubscribeAll),
        finalize(() => console.log())
      )
      .subscribe((paginationPokemon) => {
        const { page, pageSize, results } = paginationPokemon;
        this.page = page;
        this.pageSize = pageSize;
        this.pokedex = results;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  getPokemons(): Observable<Pagination<Pokemon>> {
    return this.getPokemonService.find(this.pokemonParams);
  }
}
