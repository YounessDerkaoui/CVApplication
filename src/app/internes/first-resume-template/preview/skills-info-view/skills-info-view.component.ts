import { Component, Input } from '@angular/core';
import {ISkillsInfo} from "../../first-resume-template";

@Component({
  selector: 'app-skills-info-view',
  templateUrl: './skills-info-view.component.html',
  styleUrls: ['./skills-info-view.component.scss']
})
export class SkillsInfoViewComponent {

  @Input() skillsInfo!: ISkillsInfo[];

}
