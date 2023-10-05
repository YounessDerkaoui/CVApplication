import { Component, Input } from '@angular/core';
import {IBasicInfo} from "../../first-resume-template";

@Component({
  selector: 'app-basic-info-view',
  templateUrl: './basic-info-view.component.html',
  styleUrls: ['./basic-info-view.component.scss']
})
export class BasicInfoViewComponent {

  @Input() basicInfo!: IBasicInfo;

  constructor() {}
}
