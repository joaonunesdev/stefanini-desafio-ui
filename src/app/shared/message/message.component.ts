import { Component, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})
export class MessageComponent {

  @Input() control: NgControl;
  @Input() error: string;
  @Input() text: string;

  temErro(): boolean {
    return (this.control.hasError(this.error) && (this.error === 'required' ? this.control.touched : this.control.dirty));
  }

}
