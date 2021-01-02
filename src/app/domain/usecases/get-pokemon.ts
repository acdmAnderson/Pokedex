import { Observable } from 'rxjs';
import { Pagination, Pokemon, PokemonParams } from '../models';

export abstract class GetPokemonUseCase {
  abstract find(params: PokemonParams): Observable<Pagination<Pokemon>>;
}
