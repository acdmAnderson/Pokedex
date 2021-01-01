import { Observable } from 'rxjs';
import { Pagination, Pokemon, PokemonParams } from '../models';

export interface GetPokemon {
  find(params: PokemonParams): Observable<Pagination<Pokemon>>;
}
