import { Observable } from 'rxjs';
import { Pokemon } from '../models';

export abstract class GetPokemonByNameUseCase {
  abstract findByName(pokemonName: string): Observable<Array<Pokemon>>;
}
