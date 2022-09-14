import { ICars } from './ICars';

export interface IReceipt {
  id: number;
  clientId: string; //buyer
  supplierId: string; //solder
  buyingPrice: number;
  receiptDate: Date;
  notes: string;
  car: ICars;
}
