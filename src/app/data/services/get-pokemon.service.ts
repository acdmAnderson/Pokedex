import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Pagination, Pokemon, PokemonParams } from 'src/app/domain/models';
import { GetPokemonUseCase } from 'src/app/domain/usecases/get-pokemon';
import { GetPokemon } from '../api/get-pokemon';
import { GetPokemonDetail } from '../api/get-pokemon-detail';
import { catchError, mergeMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import {
  mapToPage,
  mapToPageSize,
  mapToPokemon,
} from '../helpers/mapper.helper';

@Injectable({
  providedIn: 'root',
})
export class GetPokemonService extends GetPokemonUseCase {
  constructor(
    private readonly getPokemon: GetPokemon,
    private readonly getPokemonDetail: GetPokemonDetail
  ) {
    super();
  }
  find(params: PokemonParams): Observable<Array<Pokemon>> {
    return this.getPokemon.find(params).pipe(
      catchError((err: HttpErrorResponse) => throwError(err)),
      mergeMap(async (page) => {
        const { count, results, next } = page;
        const pokedex = [];
        for (const { url } of results) {
          const pokemonDetail = await this.getPokemonDetail
            .find(url)
            .toPromise();
          pokedex.push(mapToPokemon(pokemonDetail));
        }
        return pokedex;
      })
    );
  }
}
