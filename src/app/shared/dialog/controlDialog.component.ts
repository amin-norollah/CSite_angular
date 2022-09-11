import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IControlDialogData } from '../interfaces/global/dialog';

@Component({
  selector: 'app-control-dialog',
  template: `
    <h2 style="margin-bottom: 5px" mat-dialog-title>
      {{ data.title == '403' ? '403 Forbidden' : data.title }}
    </h2>
    <div mat-dialog-content>{{ data.message }}</div>

    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Ok</button>
    </div>
  `,
  styleUrls: [],
})
export class ControlDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IControlDialogData) {}
}
