import { ICars } from './ICars';

export interface IProduct {
  id: number;
  quantity: number;
  exported: number;
  imported: number;
  carsId: number;
  cars?: ICars;
}
