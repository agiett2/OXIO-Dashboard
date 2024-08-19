import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() public title: string = 'Modal Title';
  @Input() public sumbitBtnTxt: string = 'Save Changes';
  @Input() public cancelBtnTxt: string = 'Close';
  @Input() public isSubmitBtnDisabled: boolean = false;
  @Output() public submitBtnClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() public closeBtnClicked: EventEmitter<void> = new EventEmitter<void>();

  public constructor() {}

  public submit(): void {
    this.submitBtnClicked.emit();
  }

  public close(): void {
    this.closeBtnClicked.emit();
  }
}
