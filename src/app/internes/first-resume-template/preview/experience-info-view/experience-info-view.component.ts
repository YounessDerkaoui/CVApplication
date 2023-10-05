import {Component, Input} from '@angular/core';
import {IExperienceInfo} from "../../first-resume-template";

@Component({
  selector: 'app-experience-info-view',
  templateUrl: './experience-info-view.component.html',
  styleUrls: ['./experience-info-view.component.scss']
})
export class ExperienceInfoViewComponent {

  @Input() experienceInfo!: IExperienceInfo[];

}
