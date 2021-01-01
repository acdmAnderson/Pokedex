import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination, Pokemon } from 'src/app/domain/models';
import { GetPokemon } from 'src/app/domain/usecases/get-pokemon';
import { serverError } from '../helpers/http.helper';

@Injectable()
export class GetPokemonService implements GetPokemon {
  find(): Observable<Pagination<Pokemon>> {
    return new Observable((observer) => {
      observer.error(serverError());
      observer.complete();
    });
  }
}
