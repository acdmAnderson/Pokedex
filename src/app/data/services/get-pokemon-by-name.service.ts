import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon } from 'src/app/domain/models';
import { GetPokemonByNameUseCase } from 'src/app/domain/usecases/get-pokemon-by-name';
import { environment } from 'src/environments/environment';
import { GetPokemonDetail } from '../api/get-pokemon-detail';
import { mapToPokemon } from '../helpers/mapper.helper';

@Injectable({
  providedIn: 'root',
})
export class GetPokemonByNameService extends GetPokemonByNameUseCase {
  constructor(private readonly getPokemonDetail: GetPokemonDetail) {
    super();
  }

  findByName(pokemonName: string): Observable<Array<Pokemon>> {
    return this.getPokemonDetail
      .find(`${environment.pokeApi}/${pokemonName}`)
      .pipe(map((pokemonDetail) => [mapToPokemon(pokemonDetail)]));
  }
}
