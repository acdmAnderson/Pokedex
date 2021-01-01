import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetPokemonService } from 'src/app/data/services/get-pokemon.service';
import { Pagination, Pokemon, PokemonParams } from 'src/app/domain/models';

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
  constructor(private readonly getPokemonService: GetPokemonService) {}

  ngOnInit(): void {}

  find(): Observable<Pagination<Pokemon>> {
    return this.getPokemonService.find(this.pokemonParams);
  }
}
