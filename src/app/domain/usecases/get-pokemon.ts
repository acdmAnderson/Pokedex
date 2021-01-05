import { Observable } from 'rxjs';
import { Pokemon, PokemonParams } from '../models';

export abstract class GetPokemonUseCase {
  abstract find(params: PokemonParams): Observable<Array<Pokemon>>;
}
