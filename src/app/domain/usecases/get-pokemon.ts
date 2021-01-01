import { Observable } from 'rxjs';
import { Pagination, Pokemon, PokemonParams } from '../models';

export interface GetPokemonUseCase {
  find(params: PokemonParams): Observable<Pagination<Pokemon>>;
}
