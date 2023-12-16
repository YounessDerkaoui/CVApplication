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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.basicInfo.picture = reader.result as string
      console.log(this.basicInfo.picture)
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }
}

