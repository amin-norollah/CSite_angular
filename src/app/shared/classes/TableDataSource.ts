import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';

export class TableDataSource<T> extends DataSource<T> {
  private _dataStream = new ReplaySubject<T[]>();

  constructor(initialData: T[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<T[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: T[]) {
    this._dataStream.next(data);
  }
}
