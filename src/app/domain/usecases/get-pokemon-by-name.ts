import { Observable } from 'rxjs';
import { Pagination, Pokemon } from '../models';

export abstract class GetPokemonByNameUseCase {
  abstract findByName(pokemonName: string): Observable<Pagination<Pokemon>>;
}
