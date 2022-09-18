import { User } from 'oidc-client-ts';

export interface ICars {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  createdDate: Date;
  modifiedDate: Date;
  userId: string;
  userName: string;
}
