export interface IControlDialogData {
  title: string;
  message: string;
}

export interface IGenericDialogData {
  title: string;
  inputs: [string, string][]; //first: name, second: type
  textarea: string;
}
