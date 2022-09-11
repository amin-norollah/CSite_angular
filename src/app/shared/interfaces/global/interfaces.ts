export interface AutoWrappedList<T> {
  version: string;
  statusCode: number;
  message: string;
  result: T[];
}

export interface AutoWrappedSingle<T> {
  version: string;
  statusCode: number;
  message: string;
  result: T;
}

export interface UserLoggedinData {
  userName: string;
  password: string;
}
