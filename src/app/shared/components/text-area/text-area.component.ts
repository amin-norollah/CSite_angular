import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css'],
})
export class TextAreaComponent {
  //inout property
  @Input() title!: string;

  @Input() content!: string;
  @Output() contentChange = new EventEmitter<string>();

  constructor() {}

  EmitOutput() {
    this.contentChange.emit(this.content);
  }
}
