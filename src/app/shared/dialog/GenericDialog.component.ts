import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IGenericDialogData } from '../interfaces/global/dialog';

@Component({
  selector: 'app-generic-dialog',
  templateUrl: './GenericDialog.component.html',
  styleUrls: [],
})
export class GenericDialogComponent {
  inputs: string[] = [];
  textarea: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IGenericDialogData,
    private dialogRef: MatDialogRef<GenericDialogComponent>
  ) {
    this.inputs = new Array(data.inputs.length);
  }

  returnAndClose() {
    this.dialogRef.close({ inputs: this.inputs, textarea: this.textarea });
  }

  close() {
    this.dialogRef.close();
  }
}
