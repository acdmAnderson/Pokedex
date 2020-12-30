import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageModel, PokemonModel } from '../models';

export class GetPokemon {
  constructor(private readonly http: HttpClient) {}

  find(): Observable<PageModel<PokemonModel>> {
    return this.http.get<PageModel<PokemonModel>>('');
  }
}
