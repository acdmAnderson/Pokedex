import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetApi } from '../contracts/get-api';
import { PokemonDetailModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class GetPokemonDetail implements GetApi<PokemonDetailModel> {
  constructor(private readonly http: HttpClient) {}

  find(url: string): Observable<PokemonDetailModel> {
    return this.http.get<PokemonDetailModel>(url);
  }
}
