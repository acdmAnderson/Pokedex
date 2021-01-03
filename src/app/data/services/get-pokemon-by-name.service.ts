import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination, Pokemon } from 'src/app/domain/models';
import { GetPokemonByNameUseCase } from 'src/app/domain/usecases/get-pokemon-by-name';
import { GetPokemonDetail } from '../api/get-pokemon-detail';
import { serverError } from '../helpers/http.helper';

@Injectable({
  providedIn: 'root',
})
export class GetPokemonByNameService extends GetPokemonByNameUseCase {
  constructor(private readonly getPokemonDetail: GetPokemonDetail) {
    super();
  }

  findByName(pokemonName: string): Observable<Pagination<Pokemon>> {
    return new Observable((observer) => {
      observer.error(serverError());
      observer.complete();
    });
  }
}
