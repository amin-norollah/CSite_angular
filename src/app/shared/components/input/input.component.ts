import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  faClose = faClose;

  //inout property
  @Input() title!: string;

  @Input() content!: number | string;
  @Output() contentChange = new EventEmitter<string>();

  constructor() {}

  EmitOutput() {
    this.contentChange.emit(this.content.toString());
  }
}
