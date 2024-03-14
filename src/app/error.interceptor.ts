import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {
  Observable,
  catchError,
  concatMap,
  count,
  delay,
  of,
  retry,
  retryWhen,
  take,
  throwError,
} from 'rxjs';
import { AlertifyService } from './services/alertify.service';
import { ErrorCode } from './enums/enums';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('statred');
  const alertify = inject(AlertifyService);
  return next(req).pipe(
    retryWhen((error) => retryRequest(error, 10)),
    catchError((error: HttpErrorResponse) => {
      const errorMessage = setError(error);
      console.error(errorMessage);
      alertify.error(errorMessage);
      return throwError(errorMessage);
    })
  );
};
function setError(error: HttpErrorResponse): string {
  let errorMessage = 'unknown error';
  if (error.error instanceof ErrorEvent) {
    errorMessage = error.error.message;
  } else {
    if (error.status !== 0) {
      errorMessage = error.error.errorMessage;
    }
  }
  return errorMessage;
}

function retryRequest(
  error: Observable<HttpErrorResponse>,
  retryCount: number
): Observable<HttpErrorResponse> {
  return error.pipe(
    concatMap((checkErr: HttpErrorResponse, count: number) => {
      if (checkErr.status === ErrorCode.serverDown && count < retryCount) {
        return of(checkErr);
      }
      if (checkErr.status === ErrorCode.unauthorized && count < retryCount) {
        return of(checkErr).pipe(delay(1000))
      }
      return throwError(checkErr);
    })
  );
}
