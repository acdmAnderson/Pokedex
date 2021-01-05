import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { GetPokemonByNameService } from 'src/app/data/services/get-pokemon-by-name.service';
import { GetPokemonService } from 'src/app/data/services/get-pokemon.service';
import { Pokemon, PokemonParams } from 'src/app/domain/models';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
})
export class PokedexComponent implements OnInit, OnDestroy, OnChanges {
  private readonly LIMIT = 20;
  private readonly OFFSET = 0;
  private unsubscribeAll: Subject<any>;

  @Input() pokemonName: string;
  pokemonParams: PokemonParams;
  page: number;
  pageSize: number;
  pokedex: Array<Pokemon>;
  isLoading = false;
  isLoadingAppend = false;
  constructor(
    private readonly getPokemonService: GetPokemonService,
    private readonly getPokemonByNameService: GetPokemonByNameService
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.pokemonParams = {
      limit: this.LIMIT,
      offset: this.OFFSET,
    };
    this.buildPokedex();
  }

  private buildPokedex(): void {
    this.isLoading = true;
    this.getPokemons()
      .pipe(
        takeUntil(this.unsubscribeAll),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((pokemons) => (this.pokedex = pokemons));
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { pokemonName } = changes;
    if (pokemonName?.currentValue) {
      this.pokemonName = pokemonName.currentValue;
      this.isLoading = true;
      this.getPokemonsByName()
        .pipe(
          takeUntil(this.unsubscribeAll),
          finalize(() => (this.isLoading = false))
        )
        .subscribe((pokemons) => (this.pokedex = pokemons));
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  getPokemons(): Observable<Array<Pokemon>> {
    return this.getPokemonService.find(this.pokemonParams);
  }

  getPokemonsByName(): Observable<Array<Pokemon>> {
    return this.getPokemonByNameService.findByName(this.pokemonName);
  }

  appendPokemons(): void {
    const currentPosition = window.scrollY;
    this.pokemonParams.offset = this.pokemonParams.offset + this.LIMIT;
    this.isLoadingAppend = true;
    this.getPokemons()
      .pipe(
        takeUntil(this.unsubscribeAll),
        finalize(() => (this.isLoadingAppend = false))
      )
      .subscribe((pokemons) => {
        this.pokedex = [...this.pokedex, ...pokemons];
        setTimeout(() => {
          window.scrollTo(0, currentPosition);
        }, 200);
      });
  }

  backToTop(): void {
    window.scrollTo(0, 0);
  }

  backToFullPokedex(): void {
    this.pokemonName = null;
    this.buildPokedex();
  }
}
