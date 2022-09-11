import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

export interface QueryParams {
  [key: string]: string | number;
}

@Injectable({
  providedIn: 'root',
})
export class GenericService<T> {
  constructor(private http: HttpClient, public dialog: MatDialog) {}

  private generateHeaders = (token: string) => {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    };
  };

  public correctFormatForQueryUrl(qp: QueryParams): string {
    if (qp == null) {
      return '';
    }
    const qpAsStr = this.mapQueryParamsToUrl(qp);
    return qpAsStr.length === 0 ? '' : `?${qpAsStr.join('&')}`;
  }

  private mapQueryParamsToUrl(qp: QueryParams): Array<string> {
    return Object.keys(qp).map((key: string) => {
      return `${key}=${qp[key]}`;
    });
  }

  // openDialog(errorTitle: string, errorMessage: string) {
  // this.dialog.open(DialogComponent, {
  //   data: {
  //     title: errorTitle,
  //     message: errorMessage,
  //   },
  // });
  // }

  handleError(error: any) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(error);
  }

  //-------------GENERIC API--------------//
  // GET
  // getGenericPromise(
  //   token: string,
  //   url: string,
  //   queryString: string
  // ): Promise<T> {
  //   console.log(this.generateHeaders(token));
  //   return this.http
  //     .get<T>(url + queryString, this.generateHeaders(token))
  //     .pipe(
  //       // tap((countValue) => console.log('Count: ', countValue)),
  //       retry(1),
  //       catchError(this.handleError)
  //     )
  //     .toPromise();
  // }

  getGeneric(token: string, url: string, queryString: string): Observable<T> {
    console.log(this.generateHeaders(token));
    return this.http
      .get<T>(url + queryString, this.generateHeaders(token))
      .pipe(
        // tap((countValue) => console.log('Count: ', countValue)),
        retry(1),
        catchError(this.handleError)
      );
  }

  // CREATE
  createGeneric(token: string, url: string, item: T): Observable<T> {
    return this.http
      .post<T>(url, item, this.generateHeaders(token))
      .pipe(retry(1), catchError(this.handleError));
  }

  //PUT
  updateGeneric(token: string, url: string, item: T): Observable<T> {
    if (item == null)
      return this.http
        .put<T>(url, this.generateHeaders(token))
        .pipe(retry(1), catchError(this.handleError));

    return this.http
      .put<T>(url, item, this.generateHeaders(token))
      .pipe(retry(1), catchError(this.handleError));
  }

  //DELETE
  removeGeneric(token: string, url: string): Observable<T> {
    return this.http
      .delete<T>(url, this.generateHeaders(token))
      .pipe(retry(1), catchError(this.handleError));
  }
}
