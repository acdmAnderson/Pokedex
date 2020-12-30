import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page, PokemonModel } from '../models';

export class GetPokemon {
  constructor(private readonly http: HttpClient) {}

  find(): Observable<Page<PokemonModel>> {
    return new Observable((observer) => {
      observer.error(
        new HttpErrorResponse({
          status: 500,
          statusText: 'Internal server error',
        })
      );
      observer.complete();
    });
  }
}
