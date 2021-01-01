import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination, Pokemon, PokemonParams } from 'src/app/domain/models';
import { GetPokemonUseCase } from 'src/app/domain/usecases/get-pokemon';
import { GetPokemon } from '../api/get-pokemon';
import { GetPokemonDetail } from '../api/get-pokemon-detail';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class GetPokemonService implements GetPokemonUseCase {
  constructor(
    private readonly getPokemon: GetPokemon,
    private readonly getPokemonDetail: GetPokemonDetail
  ) {}
  find(params: PokemonParams): Observable<Pagination<Pokemon>> {
    return this.getPokemon.find(params).pipe(
      mergeMap(async (page) => {
        const { count, results } = page;
        const pokemonDetail = [];
        for (const { url } of results) {
          const pokemonDetailt = await this.getPokemonDetail
            .find(url)
            .toPromise();
          pokemonDetail.push({
            ...pokemonDetailt,
            height: `${pokemonDetailt.height} dm`,
            weight: `${pokemonDetailt.weight} hg`,
          });
        }
        return {
          count,
          next: 0,
          previous: 1,
          results: pokemonDetail,
        };
      })
    );
  }
}
