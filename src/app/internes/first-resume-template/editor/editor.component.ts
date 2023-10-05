import {Component, Input} from '@angular/core';
import {IFormData, LanguageProficiency} from "../first-resume-template";


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent{

  @Input() formData!: IFormData;

  constructor() {
  }
}


