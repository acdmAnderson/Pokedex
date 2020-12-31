import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonDetailModel } from '../models';

export class GetPokemonDetail {
  constructor(private readonly http: HttpClient) {}

  find(url: string): Observable<PokemonDetailModel> {
    return this.http.get<PokemonDetailModel>(url);
  }
}
