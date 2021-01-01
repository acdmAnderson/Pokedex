import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetApi } from '../contracts/get-api';
import { appendParams } from '../helpers/http.helper';
import { PageModel, PokemonModel, PokemonParams } from '../models';

export class GetPokemon implements GetApi<PageModel<PokemonModel>> {
  constructor(private readonly http: HttpClient) {}

  find(pokemonParams: PokemonParams): Observable<PageModel<PokemonModel>> {
    const params = appendParams<PokemonParams>(pokemonParams);
    return this.http.get<PageModel<PokemonModel>>('', { params });
  }
}
