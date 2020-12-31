import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageModel, PokemonModel, PokemonParams } from '../models';

export class GetPokemon {
  constructor(private readonly http: HttpClient) {}

  find(params: PokemonParams): Observable<PageModel<PokemonModel>> {
    return this.http.get<PageModel<PokemonModel>>('');
  }
}
