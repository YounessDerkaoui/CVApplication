import { Component, Input } from '@angular/core';
import {IEducationInfo} from "../../first-resume-template";

@Component({
  selector: 'app-education-info-view',
  templateUrl: './education-info-view.component.html',
  styleUrls: ['./education-info-view.component.scss']
})
export class EducationInfoViewComponent {

  @Input() educationInfo!: IEducationInfo[];

}
