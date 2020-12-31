import { HttpErrorResponse, HttpParams } from '@angular/common/http';

export const notFound = (): HttpErrorResponse => {
  return new HttpErrorResponse({
    status: 404,
    statusText: 'Not found',
  });
};

export const serverError = (): HttpErrorResponse => {
  return new HttpErrorResponse({
    status: 500,
    statusText: 'Internal server error',
  });
};

export const appendParams = function <T = any>(params: T): HttpParams {
  const httpParams = new HttpParams();
  for (const key of Object.keys(params)) {
    if (params[key]) {
      httpParams.append(key, params[key]);
    }
  }
  return httpParams;
};
