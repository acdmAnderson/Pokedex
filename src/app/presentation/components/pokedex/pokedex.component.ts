import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination, Pokemon, PokemonParams } from 'src/app/domain/models';
import { GetPokemonUseCase } from 'src/app/domain/usecases/get-pokemon';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
})
export class PokedexComponent implements OnInit {
  pokemonParams: PokemonParams = {
    limit: 20,
    offset: 20,
  };
  constructor(private readonly getPokemon: GetPokemonUseCase) {}

  ngOnInit(): void {}

  find(): Observable<Pagination<Pokemon>> {
    return this.getPokemon.find(this.pokemonParams);
  }
}
