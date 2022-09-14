export interface IUsers {
  id: string;
  name: string;
  family: string;
  username: string;
  password: string;
  role: UserRoles;
}

export enum UserRoles {
  Customer,
  Supplier,
  Admin,
}
