import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pagination, Pokemon } from 'src/app/domain/models';
import { GetPokemonByNameUseCase } from 'src/app/domain/usecases/get-pokemon-by-name';
import { GetPokemonDetail } from '../api/get-pokemon-detail';
import { mapToPokemon } from '../helpers/mapper.helper';

@Injectable({
  providedIn: 'root',
})
export class GetPokemonByNameService extends GetPokemonByNameUseCase {
  constructor(private readonly getPokemonDetail: GetPokemonDetail) {
    super();
  }

  findByName(pokemonName: string): Observable<Pagination<Pokemon>> {
    return this.getPokemonDetail.find(`${pokemonName}`).pipe(
      map((pokemonDetail) => {
        return {
          count: 1,
          page: 0,
          pageSize: 1,
          results: [mapToPokemon(pokemonDetail)],
        };
      })
    );
  }
}
