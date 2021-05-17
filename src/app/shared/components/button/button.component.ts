import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ColorButton, SizeButton, TypeButton } from '@shared/models/button.model';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() color: ColorButton = 'blue';
  @Input() type: TypeButton = 'button';
  @Input() size: SizeButton = 'xs';
  @Input() disabled = false;
  @Output() submitted = new EventEmitter<boolean>();

  public eventClick() {
    this.submitted.emit(true);
  }
}
