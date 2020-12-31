import { HttpErrorResponse } from '@angular/common/http';

export const notFound = (): HttpErrorResponse => {
  return new HttpErrorResponse({
    status: 404,
    statusText: 'Not found',
  });
};
