import { ICars } from './ICars';

export interface IReceipt {
  id: number;
  clientId: number; //buyer
  supplierId: number; //solder
  buyingPrice: number;
  receiptDate: Date;
  notes: string;
  car: ICars;
}
