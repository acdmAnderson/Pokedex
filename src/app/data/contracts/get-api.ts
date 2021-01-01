import { Observable } from 'rxjs';

export interface GetApi<T = any> {
  find(args?: any): Observable<T>;
}
