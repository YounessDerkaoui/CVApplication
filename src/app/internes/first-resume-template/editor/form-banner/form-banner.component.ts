import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-banner',
  templateUrl: './form-banner.component.html',
  styleUrls: ['./form-banner.component.scss']
})
export class FormBannerComponent {

  @Input() id!: string;
  @Input() mainText!: string;
  @Input() subText!: string;
  @Output() editItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteItem: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  onEditItem() {
    this.editItem.emit(this.id);
  }

  onDeleteItem() {
    this.deleteItem.emit(this.id);
  }
}
