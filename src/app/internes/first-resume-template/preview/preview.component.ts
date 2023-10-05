import { Component, Input } from '@angular/core';
import {IFormData} from "../first-resume-template";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent {

  @Input() formData!: IFormData;

  constructor() {}
}
