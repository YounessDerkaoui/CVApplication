import { Component, Input } from '@angular/core';
import {IBasicInfo} from "../../first-resume-template";

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent {

  @Input() basicInfo!: IBasicInfo;

  constructor() {
  }
}

