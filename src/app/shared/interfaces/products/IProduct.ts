import { ICars } from './ICars';

export interface IProduct {
  id: number;
  quantity: number;
  exported: number;
  imported: number;
  car: ICars;
}
