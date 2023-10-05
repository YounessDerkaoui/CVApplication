import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-banner',
  templateUrl: './item-banner.component.html',
  styleUrls: ['./item-banner.component.scss']
})
export class ItemBannerComponent {

  @Input() id!: string;
  @Input() name!: string;
  @Output() deleteItem: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  onDeleteItem() {
    this.deleteItem.emit(this.id);
  }

}
