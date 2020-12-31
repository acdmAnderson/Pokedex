import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonDetailModel } from '../models';

export class GetPokemonDetail {
  constructor(private readonly http: HttpClient) {}

  find(url: string): Observable<PokemonDetailModel> {
    return new Observable((observer) => {
      observer.error(
        new HttpErrorResponse({
          status: 500,
          statusText: 'Internal Server Error',
        })
      );
    });
  }
}
