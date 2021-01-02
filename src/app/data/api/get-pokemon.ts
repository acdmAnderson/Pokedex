import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetApi } from '../contracts/get-api';
import { appendParams } from '../helpers/http.helper';
import { PageModel, PokemonModel, PokemonParams } from '../models';

@Injectable({
  providedIn: 'root',
})
export class GetPokemon implements GetApi<PageModel<PokemonModel>> {
  constructor(private readonly http: HttpClient) {}

  find(pokemonParams: PokemonParams): Observable<PageModel<PokemonModel>> {
    const params = appendParams<PokemonParams>(pokemonParams);
    return this.http.get<PageModel<PokemonModel>>(environment.pokeApi, {
      params,
    });
  }
}
