import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination, Pokemon } from 'src/app/domain/models';
import { GetPokemonByNameUseCase } from 'src/app/domain/usecases/get-pokemon-by-name';

@Injectable({
  providedIn: 'root',
})
export class GetPokemonByNameService extends GetPokemonByNameUseCase {
  findByName(pokemonName: string): Observable<Pagination<Pokemon>> {
    return null;
  }
}
