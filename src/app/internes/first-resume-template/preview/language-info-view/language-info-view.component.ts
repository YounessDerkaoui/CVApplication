import {Component, Input} from '@angular/core';
import {ILanguageInfo} from "../../first-resume-template";

@Component({
  selector: 'app-language-info-view',
  templateUrl: './language-info-view.component.html',
  styleUrls: ['./language-info-view.component.scss']
})
export class LanguageInfoViewComponent {

  @Input() languageInfo!: ILanguageInfo[];

}
