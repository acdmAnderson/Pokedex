import { Observable } from 'rxjs';
import { Pagination, Pokemon } from '../models';

export interface GetPokemon {
  find(): Observable<Pagination<Pokemon>>;
}
